import React, {useState, useEffect, useContext} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import {MdPlace} from 'react-icons/md';
import Typography from '@material-ui/core/Typography';
import Context from 'store/context';
import client from 'apolloClient';
import {SelectedCity} from 'components/common';
import {QUERY_PLACES_MAP} from 'graphqlTypes/queries';

const Map = () => {
    const classes = useStyles();
    const {state} = useContext(Context);
    const [places, setPlaces] = useState([]);
    const [viewport, setViewport] = useState(null);
    useEffect(() => {
        if (state.selectedCity) {
            setViewport({
                latitude: state.selectedCity.location.lat,
                longitude: state.selectedCity.location.long,
                zoom: 11,
            });
            getPlaces();
        }
    }, [state.selectedCity]);

    const getPlaces = async () => {
        const variables = {city: state.selectedCity._id};
        const {data, errors} = await client.query({
            errorPolicy: 'all',
            query: QUERY_PLACES_MAP,
            variables,
        });
        if (data.getPlaces) {
            setPlaces(data.getPlaces)
        }
    };

    if (!viewport) return null;
    return (
        <div className={classes.root}>
            <SelectedCity />
            <ReactMapGL
                width="100vw"
                height="100vh"
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxApiAccessToken={process.env.REACT_APP_MAPGL_TOKEN}
                onViewportChange={newViewport => setViewport(newViewport)}
                {...viewport}
            >
                {!!places.length &&
                    places.map(item => {
                        return (
                            <>
                                <Marker latitude={item.location.lat} longitude={item.location.long} offsetLeft={-18} offsetTop={-40}>
                                    <Typography variant="h4" color="error">
                                        <MdPlace />
                                    </Typography>
                                </Marker>
                                {viewport.zoom > 14 && <Popup
                                    anchor="bottom"
                                    latitude={item.location.lat}
                                    longitude={item.location.long}
                                    closeOnClick={true}
                                    closeButton={false}
                                    offsetTop={-40}
                                >
                                        <Link className={classes.link} to={`/place/${item._id}`}>
                                                    <Typography variant="body2">{item.name}</Typography>
                                                    <Typography variant="body2">{item.address}</Typography>
                                        </Link>
                                </Popup>}
                            </>
                        );
                    })}
            </ReactMapGL>
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
    },
    link: {
        color: theme.palette.text.primary,
        textDecoration: 'none',
    }
}));

export default Map;
