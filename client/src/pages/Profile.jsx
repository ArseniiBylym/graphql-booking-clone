import React, {useContext, useState, useEffect} from 'react';
import Context from 'store/context';
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {MdAccountCircle, MdHome, MdComment, MdAssignment} from 'react-icons/md';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Spinner from 'components/Spinner';
import DefaultAvatar from 'images/defaultUser.jpg';

import {QUERY_USER} from 'graphqlTypes/queries';
import client from 'apolloClient';

const Profile = props => {
    const classes = useStyles();
    const {state} = useContext(Context);
    const [fetching, setFetching] = useState(true);
    const [user, setUser] = useState(null)
    const [bottomNav, setBottomNav] = useState(0)
    useEffect(()=> {
        getUserProfile()
    }, [])

    const getUserProfile = async () => {
        const variables = {id: props.match.params.id}
        const {data, errors} = await client.query({
            errorPolicy: 'all',
            query: QUERY_USER,
            variables,
        })
        if (data.getUser) {
            setUser(data.getUser);
        }
        setFetching(false);
    }

    if (fetching) {
        return <Spinner/>
    }
    if (!user) return null
    return (
        <Grid className={classes.root} container direction="column" alignItems="center">
            <Avatar src={user.picture || DefaultAvatar} classes={{
                root: classes.avatar
            }}/>
            <Typography variant="h6" align="center" gutterBottom>{user.name}</Typography>
            <Typography variant="h6" align="center" gutterBottom>{user.email}</Typography>
            {user.phone && 
                <Typography variant="p" align="center" gutterBottom>{user.phone}</Typography>
            }
            <BottomNavigation 
                value={bottomNav}
                onChange={(event, value) => setBottomNav(value)}
                showLabels
                className={classes.bottomNav}
            >
                <BottomNavigationAction classes={{root: classes.navButton, selected: classes.navButtonSelected}} label="Places" icon={<MdHome />} />
                <BottomNavigationAction classes={{root: classes.navButton, selected: classes.navButtonSelected}} label="Reviews" icon={<MdComment />} />
                {state.user && state.user._id === user._id && 
                    <BottomNavigationAction classes={{root: classes.navButton, selected: classes.navButtonSelected}} label="Reserves" icon={<MdAssignment />} />
                } 
            </BottomNavigation>
        </Grid>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
    },
    avatar: {
        width: '100px',
        height: '100px',
        margin: '2rem auto',
    },
    bottomNav: {
        width: '100%',
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(1),
        marginTop: 'auto'
    },
    navButton: {
        color: 'white',
        fontSize: '18px',
    },
    navButtonSelected: {
        color: 'black !important'
    }
}));

export default Profile;