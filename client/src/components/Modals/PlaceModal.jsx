import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/styles';
import {MdAdd} from 'react-icons/md'

const PlaceModal = props => {
    const classes = useStyles()
    const [modal, setModal] = useState(false)
    return (
        <>
            <Fab className={classes.button} variant="contained" color="primary" onClick={() => setModal(true)}>
                <MdAdd />
            </Fab>
            <Dialog
                open={modal}
                onClose={() => setModal(false)}
                aria-labelledby="pace-modal-title"
                aria-describedby="pace-modal-description"
            >
                <DialogTitle className={classes.dialogTitle} id="pace-modal-title">Create new place</DialogTitle>
                <DialogActions className={classes.dialogActions}>
                    <Button onClick={() => setModal(false)} color="primary">
                        Cancel
                    </Button>
                    <Link to='/new-place' className={classes.link}> 
                        <Button  color="primary" autoFocus>
                            Continue
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </>
    );
};

const useStyles = makeStyles(theme => ({
    button: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        fontSize: '18px',
    },
    dialogTitle: {
        padding: theme.spacing(4)
    },
    dialogActions: {
        justifyContent: 'space-evenly'
    },
    link: {
        textDecoration: 'none',
    }
}))

export default PlaceModal;
