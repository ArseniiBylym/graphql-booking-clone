import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ReviewItem from 'components/Place/ReviewItem'

const Reviews = ({reviews}) => {
    return (
        <> 
            {reviews.map(item => (
                <ReviewItem key={item._id} {...item} />
            ))}
        </>
    )
}

const useStyles = makeStyles(theme => ({

}))

export default Reviews

