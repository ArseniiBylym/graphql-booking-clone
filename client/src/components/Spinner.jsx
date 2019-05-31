import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const Spinner = props => {
    const classes = useStyles();
    return (
        <Grid className={classes.progressWrapper} container alignItems="center" justify="center">
            <CircularProgress className={classes.progress} />
        </Grid>
    )
}

const useStyles = makeStyles({
    progressWrapper: {
        width: '100%',
        height: '100%',
    },
    progress: {

    }
})

export default Spinner