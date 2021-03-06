import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import PlaceCard from 'components/Place/PlaceCard'
import Typography from '@material-ui/core/Typography';

const Places = ({places}) => {
    const classes = useStyles();
    if (!places.length) {
        return <Typography align="center" className={classes.emptyHeader} variant="h5">
            User has no created places
        </Typography>
    }
    return (
        <Grid container className={classes.places} direction="column" spacing={2}> 
            {places.map(item => (
                <PlaceCard key={item._id} {...item} />
            ))}
        </Grid>
    )
}

const useStyles = makeStyles(theme => ({
    places: {
        flexGrow: 1,
        padding: theme.spacing(2),
        marginBottom: '50px',
    },
    emptyHeader: {
        marginTop: theme.spacing(2),
    }
}))

export default Places

