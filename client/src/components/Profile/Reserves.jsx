import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import {ReserveItem} from 'components/Reserve'
import Typography from '@material-ui/core/Typography';


const Reserves = ({reserves}) => {
    const classes = useStyles();

    if (!reserves.length) {
        return <Typography align="center" className={classes.emptyHeader} variant="h5">
            User has no reserves
        </Typography>
    }
    return (
        <Grid container className={classes.reserves} direction="column" spacing={2}> 
            {reserves.map(item => (
                <ReserveItem key={item._id} {...item} />
            ))}
        </Grid>
    )
}

const useStyles = makeStyles(theme => ({
    reserves: {
        flexGrow: 1,
        padding: theme.spacing(2),
        marginBottom: '50px',
    },
    emptyHeader: {
        marginTop: theme.spacing(2),
    }
}))

export default Reserves;
