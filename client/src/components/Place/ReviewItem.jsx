import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import Context from 'store/context';
// import client from 'appolloClient';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import DefaultAvatar from 'images/defaultUser.jpg';
import StarRating from 'react-star-rating-component';
import moment from 'moment';


const Review = ({_id, owner, text, rating, date}) => {
    console.log('owner', owner)
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container className={classes.grid} direction="column">
                    <Grid container className={classes.gridHeader} direction="row" alignItems="center" >
                        <Link to={`/profile/${owner._id}`}><Avatar className={classes.avatar} src={owner.picture || DefaultAvatar}></Avatar></Link>
                        <Link className={classes.link} to={`/profile/${owner._id}`}><Typography className={classes.name} color="primary">{owner.name}</Typography></Link>
                        {rating && (
                            <Typography className={classes.rating}>
                                <StarRating name="star-rating" editing={false} starCount={5} value={rating} />
                            </Typography>
                        )}
                        <Typography className={classes.date}>{moment(Number(date)).format('Do MMM YYYY')}</Typography>
                    </Grid>
                    <Typography variant="body1">{text}</Typography>    
                </Grid>
            </Paper>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        margin: '1rem 0',
    },
    grid: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.light,
    },
    gridHeader: {
        marginBottom: theme.spacing(1)
    },
    avatar: {
        width: '30px',
        height: '30px'
    },
    name: {
        margin: '0 .5rem'
    },
    rating: {
        display: 'flex',
    },
    date: {
        marginLeft: 'auto'
    },
    link: {
        textDecoration: 'none'
    },
}))
export default Review;