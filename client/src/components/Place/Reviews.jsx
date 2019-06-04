import React, {useState, useEffect, useContext} from 'react';
import Context from 'store/context';
// import client from 'appolloClient';
import { makeStyles } from '@material-ui/styles';
import ReviewForm from './ReviewForm'
import Review from './ReviewItem';
import { Typography } from '@material-ui/core';

const Reviews = ({reviews, placeId, pushReview}) => {
    const classes = useStyles();
    const {state, dispatch} = useContext(Context);

    return (
        <div className={classes.root}>
            {!reviews.length&& (
                <Typography align="center" variant="body1">
                    The place has no reviews yet {state.isAuth && ', you can create the first one '}
                </Typography>
            )}
            {state.isAuth && <ReviewForm placeId={placeId} pushReview={pushReview}/>}
            {reviews.map(item => {
                return (
                    <Review key={item._id} {...item} />
                )
            })}
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
    }
}))
export default Reviews;