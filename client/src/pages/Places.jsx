import React, {useContext, useEffect, useState} from 'react';
import {Redirect} from 'react-router';
import Context from 'store/context';
import { makeStyles } from '@material-ui/core/styles';
import SelectedCity from 'components/common/SelectedCity';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Spinner} from 'components/common';
import {PlaceModal} from 'components/Modals'

import PlaceCard from 'components/Place/PlaceCard';
import Pagination from 'components/common/Pagination';
import client from 'apolloClient'
import {QUERY_PLACES} from 'graphqlTypes/queries'

const Places = (props) => {
    const classes = useStyles();
    const {state, dispatch} = useContext(Context);
    const [fetching, setFetching] = useState(true)
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        console.log('fetching')
        if (state.selectedCity) {
            getPlaces()
        }
    },[state.selectedCity])

    const getPlaces = async() => {
        console.log(state.selectedCity)
        const variables = {city: state.selectedCity._id}
        const {data, errors} = await client.query({
            errorPolicy: 'all',
            query: QUERY_PLACES,
            variables,
        })
        if (data.getPlaces) {
            setPlaces(data.getPlaces);
        }
        setFetching(false)
    }

    if (!state.selectedCity) {
        console.log('redirect')
        props.history.push('/')
    }
    if (fetching) {
        return <Spinner />
    }
    if (!places.length) {
        return (
            <Grid className={classes.root} container direction="column" >
                <SelectedCity/>
                <Typography align="center" variant="h5" component="h1" className={classes.emptyTitle}>No places found for selected city</Typography>
                {state.isAuth && <PlaceModal />}
            </Grid>
        )
    }
    return (
        <Grid className={classes.root} container direction="column" wrap="nowrap">
            <SelectedCity/>
            <Grid className={classes.places} container direction="column" spacing={2} >
                {places.map(item => (
                    <PlaceCard key={item._id} {...item} />
                ))}
                <div className={classes.pagination}>
                    <Pagination/>
                </div>
            </Grid>
            {state.isAuth && <PlaceModal />}
        </Grid>
    )
}

const useStyles = makeStyles(theme => ({
    root: { 
        width: '100%',
        height: '100%',
        position: 'relative'
    },
    places: {
        flexGrow: 1,
        padding: theme.spacing(2),
        width: '100%',
        margin: 0
    },
    pagination: {
        marginTop: 'auto'
    },
    emptyTitle: {
        marginTop: theme.spacing(5),
    }
}));

export default Places;