import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from '@material-ui/styles';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment'
import {Typography} from '@material-ui/core';
import {MdCheck, MdClose} from 'react-icons/md';
import {QUERY_CHECK_DATES} from 'graphqlTypes/queries';
import {MUTATION_CREATE_RESERVE} from 'graphqlTypes/mutations'
import client from 'apolloClient';

const ReserveModal = props => {
    const classes = useStyles();
    const [modal, setModal] = useState(false);
    const [startDate, setStartDate] = useState(moment().hour(12).minute(0).valueOf());
    const [endDate, setEndDate] = useState(null);
    const [dateChecked, setDateChecked] = useState(false);
    const [dataAvailable, setDateAvailable] = useState(false);
    const [confirming, setConfirming] = useState(false);

    const checkDates = async() => {
        if (!startDate || !endDate || (startDate >= endDate)) {
            setDateChecked(false);
            return;
        };
        const variables = {
            placeId: props.placeId,
            startDate: String(startDate), 
            endDate: String(endDate)
        };
        const {data, errors} = await client.query({
            errorPolicy: 'all',
            fetchPolicy: 'network-only',
            query: QUERY_CHECK_DATES,
            variables,
        })
        if (data.checkDates) {
            setDateChecked(true)
            switch(data.checkDates) {
                case "available": 
                    setDateAvailable(true);
                    break;
                case 'reserved':
                default: 
                    setDateAvailable(false);
                    break;
            }
        }
    }

    const cancelHandler = () => {
        setStartDate(moment().hour(12).minute(0).valueOf());
        setEndDate(null);
        setModal(false);
        setDateChecked(false)
        setDateAvailable(false)
    };

    const confirmHandler = async() => {
        setConfirming(true)
        const variables = {
            placeId: props.placeId,
            startDate: String(startDate), 
            endDate: String(endDate)
        };
        const {data, errors} = await client.mutate({
            errorPolicy: 'all',
            mutation: MUTATION_CREATE_RESERVE,
            variables,
            context: {
                headers: {authorization: localStorage.getItem('token')}
            }
        })
        if (data.createReserve) {
            console.log('success')
        }
        setConfirming(false)
        setModal(false)
        setDateChecked(false)
        setDateAvailable(false)
        setEndDate(null)
    };

    const dateChangeHandler = name => newDate => {
        const time = newDate.hour(12).minute(0).valueOf();
        name === 'startDate' ? setStartDate(time) : setEndDate(time)

    }

    return (
        <>
            <Button className={classes.button} variant="contained" color="primary" onClick={() => setModal(true)}>
                Reserve
            </Button>
            <Dialog
                open={modal}
                onClose={() => setModal(false)}
                aria-labelledby="reserve-modal-title"
                aria-describedby="reserve-modal-description"
            >
                <DialogTitle className={classes.dialogTitle} id="reserve-modal-title">
                    Select your visit dates
                </DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <MuiPickersUtilsProvider utils={MomentUtils} moment={moment}>
                        <KeyboardDatePicker
                            margin="normal"
                            label="Start date"
                            value={startDate}
                            onAccept={checkDates}
                            onChange={dateChangeHandler('startDate')}
                            minDate={Date.now()}
                        />
                        <KeyboardDatePicker
                            margin="normal"
                            label="End date"
                            value={endDate}
                            onAccept={checkDates}
                            onChange={dateChangeHandler('endDate')}
                            minDate={Date.now() + 1000 * 60 * 60 * 24}
                        />
                    </MuiPickersUtilsProvider>
                </DialogContent>
                {dateChecked && (
                    <Typography color={dataAvailable ? 'primary' : 'error'} variant="h5" align="center" gutterBottom>
                        {dataAvailable ? <MdCheck /> : <MdClose/>}
                        {dataAvailable ? 'Available' : 'Engaged'}
                    </Typography>
                )}
                <DialogActions className={classes.dialogActions}>
                    <Button variant="contained" onClick={cancelHandler} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        disabled={!dateChecked || !dataAvailable || confirming}
                        variant="contained"
                        onClick={confirmHandler}
                        color="primary"
                        autoFocus
                    >
                        {confirming ? 'Confirming...' : 'Confirm'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

const useStyles = makeStyles(theme => ({
    button: {
        margin: '1rem 0',
    },
    dialogContent: {
        marginBottom: theme.spacing(2),
    },
    dialogActions: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    dialogTitle: {
        textAlign: 'center',
        fontSize: '18px',
    },
}));

export default ReserveModal;
