import React, {useState, useEffect, useContext} from 'react';
import Context from 'store/context';
// import client from 'appolloClient';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import StarRating from 'react-star-rating-component';
import { Typography } from '@material-ui/core';
import client from 'apolloClient';
import {MUTATION_ADD_REVIEW} from 'graphqlTypes/mutations'

const ReviewForm = ({placeId, pushReview}) => {
    const classes = useStyles();
    const [text, setText] = useState('');
    const [rating, setRating] = useState('');

    const sendReviewHandler = async() => {
        const variables = {placeId, text, rating: rating || undefined};
        const {data, errors} = await client.mutate({
            errorPolicy: 'all',
            mutation: MUTATION_ADD_REVIEW,
            variables,
            context: {
                headers: {authorization: localStorage.getItem('token')}
            }
        }) 
        if (data.createReview) {
            pushReview(data.createReview);
            console.log(data.createReview)
        }
        console.log(text);
        setText('');
        setRating('');
    }
    const raitingChangeHandler = nextValue => {
        setRating(nextValue);
    };
    return (
        <div className={classes.root}>
            <TextField
                label="Add review"
                multiline
                maxRows="3"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
            />
            <Typography align="left" gutterBottom variant="h5">
                <StarRating value={rating} starCount={5} onStarClick={raitingChangeHandler} />
            </Typography>
            <Button color="primary" variant="contained" onClick={sendReviewHandler} disabled={!text}>Send</Button>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        textAlign: 'center'
    }
}))
export default ReviewForm;