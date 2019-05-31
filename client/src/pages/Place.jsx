import React, {useState, useEffect, useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { spacing } from '@material-ui/system';
import Context from 'store/context';
import client from 'apolloClient';
import Spinner from 'components/Spinner';
import {QUERY_PLACE} from 'graphqlTypes/queries';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import StarRating from 'react-star-rating-component';
import Modal from 'components/Modals/index';
import MainInfo from 'components/Place/MainInfo';
import Reviews from 'components/Place/Reviews';
import Map from 'components/Place/Map';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {MdInfoOutline, MdMap, MdComment} from 'react-icons/md'

const Place = props => {
    const classes = useStyles();
    const {state, dispatch} = useContext(Context);
    const [place, setPlace] = useState(null);
    const [fetching, setFetching] = useState(true);
    const [bottomNav, setBottomNav] = useState('info')
    useEffect(() => {
        getPlace();
    }, []);

    const getPlace = async () => {
        const variables = {id: props.match.params.id};
        const {data, errors} = await client.query({
            errorPolicy: 'all',
            query: QUERY_PLACE,
            variables,
        });
        if (data.getPlace) {
            setPlace(data.getPlace);
        }
        setFetching(false);
    };

    const pushReview = data => {
        setPlace({
            ...place,
            reviews: place.reviews.concat(data),
        });
    };

    if (fetching) return <Spinner />;
    if (!place) return null;
    return (
        <Grid className={classes.root} container direction="column" wrap="nowrap">
            <Box className={classes.paper} m="0"  p={2}>
                <Grid className={classes.grid} container direction="column" >
                    {bottomNav === 'info' && <MainInfo {...place}/>}
                    {bottomNav === 'reviews' && <Reviews reviews={place.reviews} placeId={place._id} pushReview={pushReview} mt="auto"/>}
                    {bottomNav === 'map' && <Map location={place.location} name={place.name} address={place.address} />}
                </Grid>
            </Box>
            <BottomNavigation 
                value={bottomNav}
                onChange={(event, value) => setBottomNav(value)}
                showLabels
                className={classes.bottomNav}
            >
                <BottomNavigationAction classes={{root: classes.navButton, selected: classes.navButtonSelected}} label="Info" value="info" icon={<MdInfoOutline />} />
                <BottomNavigationAction classes={{root: classes.navButton, selected: classes.navButtonSelected}} label="Reviews" value="reviews" icon={<MdComment />} />
                <BottomNavigationAction classes={{root: classes.navButton, selected: classes.navButtonSelected}} label="Map" value="map" icon={<MdMap />} />
            </BottomNavigation>
        </Grid>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: 'calc(100vh - 56px)',
        overflow: 'hidden',
    },
    paper: {
        flexGrow: 1,
        maxWidth: '800px',
        display: 'flex',
        flexFlow: 'column nowrap',
        overflow: 'auto',
    },
    grid: {
        flexGrow: 1,
    },
    bottomNav: {
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(1)
    },
    navButton: {
        color: 'white',
        fontSize: '18px',
    },
    navButtonSelected: {
        color: 'black !important'
    }
}));

export default Place;
