import React from 'react';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import StarRating from 'react-star-rating-component';

const PlaceCard = props => {
    const {_id, name, address, mainImage, price, rating} = props;
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardActionArea />
            <CardMedia className={classes.media} image={mainImage} title={name} />
            <CardContent>
                <Typography align="center" gutterBottom variant="h5" component="h2">
                    {name}
                </Typography>
                <Grid container alignItems="center" justify="space-between">
                    <Typography variant="body2" color="textSecondary" component="p">
                        {address}
                    </Typography>
                    <Typography color="error" variant="h6">{`$ ${price.toFixed(2)}`}</Typography>
                </Grid>
                {rating && <StarRating name="star-rating" editing={false} starCount={5} value={rating} />}
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Link className={classes.link} to={`/place/${_id}`}><Button variant="contained" color="primary">See more</Button></Link>
            </CardActions>
        </Card>
    );
};

const useStyles = makeStyles({
    card: {},
    media: {
        width: '100%',
        height: '150px',
    },
    cardActions: {
        justifyContent: 'center'
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }

});

export default PlaceCard;
