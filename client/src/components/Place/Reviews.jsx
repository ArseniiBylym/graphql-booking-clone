import React, {useState, useEffect, useContext} from 'react';
import Context from 'store/context';
// import client from 'appolloClient';
import { makeStyles } from '@material-ui/styles';
import ReviewForm from './ReviewForm'
import Review from './ReviewItem';

const Reviews = ({reviews, placeId, pushReview}) => {
    const classes = useStyles();
    const {state, dispatch} = useContext(Context);

    return (
        <div className={classes.root}>
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
        marginTop: 'auto'
    }
}))
export default Reviews;