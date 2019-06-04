import React, {useContext, useState, useEffect} from 'react';
import Context from 'store/context';
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {MdInfoOutline, MdHome, MdComment, MdAssignment} from 'react-icons/md';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {Spinner} from 'components/common';
import DefaultAvatar from 'images/defaultUser.jpg';
import {MainInfo, Places, Reviews, Reserves} from 'components/Profile';

import {QUERY_USER} from 'graphqlTypes/queries';
import client from 'apolloClient';

const Profile = props => {
    const classes = useStyles();
    const {state} = useContext(Context);
    const [fetching, setFetching] = useState(true);
    const [user, setUser] = useState(null)
    const [bottomNav, setBottomNav] = useState('info')
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
            console.log(data.getUser)
        }
        setFetching(false);
    }

    if (fetching) return <Spinner/>
    if (!user) return null
    return (
        <Grid className={classes.root} container direction="column" > 
            {bottomNav === 'info' && <MainInfo name={user.name} email={user.email} picture={user.picture} phone={user.phone}/>}
            {bottomNav === 'places' && <Places places={user.places}/>}
            {bottomNav === 'reviews' && <Reviews reviews={user.reviews}/>}
            {bottomNav === 'reserves' && <Reserves reserves={user.reserves}/>}
            <BottomNavigation 
                value={bottomNav}
                onChange={(event, value) => setBottomNav(value)}
                showLabels
                className={classes.bottomNav}
            >
                <BottomNavigationAction classes={{root: classes.navButton, selected: classes.navButtonSelected}} value="info" label="Info" icon={<MdInfoOutline />} />
                <BottomNavigationAction classes={{root: classes.navButton, selected: classes.navButtonSelected}} value="places" label="Places" icon={<MdHome />} />
                <BottomNavigationAction classes={{root: classes.navButton, selected: classes.navButtonSelected}} value="reviews" label="Reviews" icon={<MdComment />} />
                {state.user && state.user._id === user._id && 
                    <BottomNavigationAction classes={{root: classes.navButton, selected: classes.navButtonSelected}} value="reserves" label="Reserves" icon={<MdAssignment />} />
                } 
            </BottomNavigation>
        </Grid>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: 'calc(100vh - 56px)',
        position: 'relative',
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
        // marginTop: 'auto'
        position: 'fixed',
        bottom: 0,
        left: 0,
        rigth: 0,
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