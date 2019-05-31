import React, {useContext, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';

import Context from 'store/context';
import client from 'apolloClient';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Home from 'pages/Home';
import Places from 'pages/Places';
import Place from 'pages/Place';
import Map from 'pages/Map';
import Profile from 'pages/Profile';
import Reserves from 'pages/Reserves';
import Logout from 'pages/Logout';
import Header from 'components/Header/index';
import {QUERY_ME} from 'graphqlTypes/queries';
import {LOGIN, SET_CURRENT_CITY} from 'store/actionTypes';

const MainRoute = () => {
    const classes = useStyles();
    const {dispatch} = useContext(Context);
    useEffect(() => {
        getUser();
    }, []);
    useEffect(() => {
        setSelectedCity()
    }, [])

    const setSelectedCity = () => {
        const city = localStorage.getItem('city');
        if (city) {
            dispatch({type: SET_CURRENT_CITY, payload: JSON.parse(city)})
        }
    }

    const getUser = async () => {
        const {data, errors} = await client.query({
            errorPolicy: 'all',
            query: QUERY_ME,
            context: {
                headers: {authorization: localStorage.getItem('token')}
            }
        });
        if (data.me) {
            dispatch({type: LOGIN, payload: data.me});
        }
    };
    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Header />
            </div>
            <div className={classes.content}>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/places" component={Places} />
                    <Route path="/place/:id" component={Place} />
                    <Route path="/map" component={Map} />
                    <Route path="/profile/:id" component={Profile} />
                    <Route path="/reserves" component={Reserves} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        </div>
    );
};

const useStyles = makeStyles({
    root: {
        width: '100vw',
        minHeight: '100vh',
        overflow: 'hidden'
    },
    header: {
        height: '56px',
        position: 'relative'
    },
    content: {
        height: 'calc(100vh - 56px)',
        // backgroundColor: 'pink',
        overflow: 'auto',
    }
})

export default MainRoute;
