import React, {useState, useEffect, useContext} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/styles';
import Context from 'store/context'
import {MdPlace} from 'react-icons/md'

const LocationModal = ({setLocationHandler}) => {
    const classes = useStyles()
    const {state} = useContext(Context);
    const [modal, setModal] = useState(false)
    const [viewport, setViewport] = useState(null);
    const [location, setLocation] = useState(null);
    useEffect(() => {
        if (state.selectedCity) {
            setViewport({
                latitude: state.selectedCity.location.lat,
                longitude: state.selectedCity.location.long,
                zoom: 11,
            });
        }
    }, [state.selectedCity]);

    const mapClickHandler = ({ lngLat, leftButton }) => {
        if(!leftButton) return;
        const [longitude, latitude] = lngLat;
        setLocation({latitude, longitude})
    }

    const cancelHandler = () => {
        setLocation(null)
        setModal(false);
    }

    const continueHandler = () => {
        setLocationHandler({lat: location.latitude, long: location.longitude});
        setModal(false);
    }

    if (!viewport) return null;
    return (
        <>
            <Button className={classes.button} variant="contained" color="primary" onClick={() => setModal(true)}>
                Location
            </Button>
            <Dialog
                open={modal}
                onClose={() => setModal(false)}
                aria-labelledby="place-location-title"
                aria-describedby="place-location-description"
            >
                <DialogContent className={classes.content}>
                <ReactMapGL
                    width="300px"
                    height="400px"
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                    mapboxApiAccessToken={process.env.REACT_APP_MAPGL_TOKEN}
                    onViewportChange={newViewport => setViewport(newViewport)}
                    onClick={mapClickHandler}
                    {...viewport}
                >
                    {location && (
                        <Marker latitude={location.latitude} longitude={location.longitude} offsetLeft={-18} offsetTop={-40}>
                        <Typography variant="h4" color="error">
                            <MdPlace />
                        </Typography>
                    </Marker>
                    )}
                </ReactMapGL>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelHandler} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={continueHandler} color="primary" autoFocus>
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

const useStyles = makeStyles(theme => ({
    button: {
        margin: '1rem 0'
    },
    content: {
        width: '300px',
        height: '400px',
        padding: 0,
        margin: 0,
    }
}))

export default LocationModal;
