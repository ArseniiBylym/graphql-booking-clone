import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {MdMenu, MdAccountCircle, MdLocationCity} from 'react-icons/md';

import MainMenuButton from './MenuButton';
import UserMenuButton from './UserButton'
import Context from 'store/context';
import {USER_ACTIONS} from 'store/actionTypes';

const Header = () => {
    const classes = useStyles();
    const {state, dispatch} = useContext(Context);

    const loginUser = () => {
        dispatch({type: USER_ACTIONS.LOGIN, payload: {name: 'Bill', email: 'bill@gmail.com'}});
    };
    const logoutUser = () => {
        dispatch({type: USER_ACTIONS.LOGOUT});
    };
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <MainMenuButton />
                    <Grid container justify="center" alignItems="center" className={classes.title}>
                        <Grid item>
                            <MdLocationCity className={classes.icon}/>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">Booking</Typography>
                        </Grid>
                    </Grid>
                    <UserMenuButton/>
                </Toolbar>
            </AppBar>
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        // marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textAlign: 'center',
    },
    icon: {
        display: 'block',
        width: '1.5rem',
        height: '1.5rem',
        marginRight: theme.spacing(1),
    }
}));

export default Header;
