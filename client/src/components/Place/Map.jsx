import React, {useState, useEffect, useContext} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import {makeStyles} from '@material-ui/core/styles';
import {MdPlace} from 'react-icons/md'
import Typography from '@material-ui/core/Typography';

const Map = ({location, name, address}) => {
    const classes = useStyles();
    const [viewport, setViewport] = useState(null);
    useEffect(() => {
        setViewport({
            latitude: location.lat,
            longitude: location.long,
            zoom: 14
        })
    }, [])
    
    if (!viewport) return null;
    return (
        <div className={classes.root}>
            <ReactMapGL
                width="100vw"
                height="100vh"
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxApiAccessToken="pk.eyJ1IjoicmVlZGJhcmdlcmNvZGVzIiwiYSI6ImNqczVodXgzczAwM3E0M3MydzI0OHN0ZzEifQ.0qj4u8RW-Rj6An3WFLXKqA"
                onViewportChange={newViewport => setViewport(newViewport)}
                {...viewport}
            >
                 <Marker
                    latitude={location.lat}
                    longitude={location.long}
                    offsetLeft={-23}
                    offsetTop={-40}
                >
                    <Typography variant="h3" color="error"><MdPlace/></Typography>
                </Marker>
                <Popup
                    anchor="bottom"
                    latitude={location.lat}
                    longitude={location.long}
                    closeOnClick={true}
                    closeButton={false}
                    offsetTop={-40}
                >
                        <Typography>{name}</Typography>
                        <Typography>{address}</Typography>
                </Popup>
            </ReactMapGL>
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        margin: '-16px'
    },
}));

export default Map;
