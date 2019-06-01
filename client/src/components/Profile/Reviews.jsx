import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ReviewItem from 'components/Place/ReviewItem'

const Reviews = ({reviews}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}> 
            {reviews.map(item => (
                <ReviewItem key={item._id} {...item} />
            ))}
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        padding: theme.spacing(2)
    }
}))

export default Reviews

