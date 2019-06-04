import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ReviewItem from 'components/Place/ReviewItem'
import Typography from '@material-ui/core/Typography';


const Reviews = ({reviews}) => {
    const classes = useStyles();

    if (!reviews.length) {
        return <Typography align="center" className={classes.emptyHeader} variant="h5">
            User has no added reviews
        </Typography>
    }
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
    },
    emptyHeader: {
        marginTop: theme.spacing(2),
    }
}))

export default Reviews

