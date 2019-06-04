import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import moment from 'moment'

const ReserveItem = ({_id, place, owner, startDate, endDate, status, totalPrice}) => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardContent>
                <Link to={`/places/${place._id}`} className={classes.link}>
                <Typography align="center" gutterBottom variant="h5" component="h2">
                    {place.name}
                </Typography>
                </Link>
                <Typography align="center" gutterBottom variant="body1" >
                    {place.address}
                </Typography>
                <Typography align="center" gutterBottom variant="body1" >
                    Reserved by {' '}
                    <Link to={`/profile/${owner._id}`} className={classes.link} >
                        {owner.name}
                    </Link>
                </Typography>
                <Typography align="center" gutterBottom variant="body1">
                    From <span className={classes.span}>{moment(Number(startDate)).format('MMM Do YYYY')}</span> to <span className={classes.span}>{moment(Number(endDate)).format('MM Do YYYY')}</span>
                </Typography>
                <Grid container alignItems="center" justify="space-evenly">
                    <Typography>Order status: <span className={classes.span}>{status}</span></Typography>
                    <Typography>Total price: <span className={classes.span}>$ {totalPrice.toFixed(2)}</span></Typography>
                </Grid>
                
            </CardContent>
        </Card>
    )
}

const useStyles = makeStyles(theme => ({
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.main
    },
    span: {
        fontWeight: 'bold',
    }
}))

export default ReserveItem;