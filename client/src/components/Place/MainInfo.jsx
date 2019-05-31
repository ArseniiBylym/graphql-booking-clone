import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import StarRating from 'react-star-rating-component';
import { makeStyles } from '@material-ui/core/styles';
import Modal from 'components/Modals/index';

const MainInfo = ({name, address, rating, mainImage, price}) => {
    const classes = useStyles();
    return (
        <>
            <Typography align="center" gutterBottom variant="h5">
                        {name}
                    </Typography>
                    <img 
                        className={classes.image}
                        src={mainImage}
                        alt={name}
                    />
                    <Typography gutterBottom variant="body1">
                        {address}
                    </Typography>
                    <Grid container justify="space-between">
                        <div>
                            <Typography align="center" gutterBottom variant="body1">
                                Average rating
                            </Typography>
                            <StarRating name="star-rating" editing={false} starCount={5} value={rating} />
                        </div>
                        <div>
                            <Typography align="center" gutterBottom variant="body1">
                                Price per day
                            </Typography>
                            <Typography align="center" gutterBottom variant="body1">{`$ ${price.toFixed(2)}`}</Typography>
                        </div>
                    </Grid>
                    <Modal.Reserve />
        </>
    )
}

const useStyles = makeStyles(theme => ({
    image: {
        width: '100%',
        height: '200px',
        marginBottom: theme.spacing(2)
    },
}));


export default MainInfo;