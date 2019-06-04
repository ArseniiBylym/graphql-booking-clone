import React, {useState, useContext, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Context from 'store/context';
import {MdClose} from 'react-icons/md';
import { HIDE_NOTIFICATION } from 'store/actionTypes';

const Notification = props => {
    const classes = useStyles();
    const {state, dispatch} = useContext(Context);

    return (
        <div className={classes.root}>
            <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                open={state.showNotification}
                autoHideDuration={6000}
                onClose={() => dispatch({type: HIDE_NOTIFICATION})}
                ContentProps={{
                'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{state.notificationText}</span>}
                action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={() => dispatch({type: HIDE_NOTIFICATION})}
                >
                    <MdClose />
                </IconButton>,
                ]}
            />
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
    }
}))

export default Notification;