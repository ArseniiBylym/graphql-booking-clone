import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/styles';

const ReserveModal = props => {
    const classes = useStyles()
    const [modal, setModal] = useState(false)
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
                <DialogTitle id="reserve-modal-title">{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="reserve-modal-description">
                        Let Google help apps determine location. This means sending anonymous location data to Google,
                        even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setModal(false)} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={() => setModal(false)} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

const useStyles = makeStyles(theme => ({
    button: {
        margin: '1rem 0'
    }
}))

export default ReserveModal;
