import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {MdLocationCity} from 'react-icons/md';
import MainMenuButton from './MenuButton';
import UserMenuButton from './UserButton'

const Header = () => {
    const classes = useStyles();

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
