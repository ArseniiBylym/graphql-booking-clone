import React, {useContext, useState, useEffect} from 'react';
import Context from 'store/context';
import {makeStyles} from '@material-ui/core/styles';

import {QUERY_CITIES} from 'graphqlTypes/queries';
import {Query} from 'react-apollo';
import {INIT_CITIES, SET_CURRENT_CITY} from 'store/actionTypes';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import client from 'apolloClient';
import {SelectedCity} from 'components/common';

const Home = props => {
    const classes = useStyles();
    const {state, dispatch} = useContext(Context);
    const [city, setCity] = useState('');
    const [cities, setCities] = useState([]);
    useEffect(() => {
        getCities();
    }, []);
    useEffect(() => {
        if (state.selectedCity) {
            setCity(state.selectedCity._id)
        }
    }, [state.selectedCity])

    const getCities = async () => {
        const {data, errors} = await client.query({
            errorPolicy: 'all',
            query: QUERY_CITIES,
        });
        if (data) {
            setCities(data.getCities);
        }
    };

    const changeHandler = e => {
        setCity(e.target.value);
    };

    const confirmHandler = () => {
        const selectedCity = cities.find(item => item._id === city);
        if (selectedCity) {
            dispatch({type: SET_CURRENT_CITY, payload: selectedCity});
            localStorage.setItem('city', JSON.stringify(selectedCity))
            props.history.push('/places')
        }
    };

    return (
        <div className={classes.root}>
             <SelectedCity />
            <Typography className={classes.title} variant="h5" component="h1" align="center">
                Select city to continue
            </Typography>
            <TextField
                id="outlined-select-currency"
                select
                label="City"
                className={classes.textField}
                value={city}
                onChange={changeHandler}
                SelectProps={{
                    MenuProps: {
                        className: classes.menu,
                    },
                }}
                // helperText="Please select your city"
                margin="normal"
                variant="outlined"
            >
                {cities.map(item => (
                    <MenuItem key={item._id} value={item._id}>
                        {item.name}
                    </MenuItem>
                ))}
            </TextField>
            <Button
                onClick={confirmHandler}
                className={classes.button}
                variant="contained"
                color="primary"
                disabled={!city}
            >
                Continue
            </Button>
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        marginTop: theme.spacing(4),
    },
    textField: {
        flexGrow: 1,
        margin: theme.spacing(4),
    },
    button: {
        margin: theme.spacing(4),
        marginTop: 0,
    },
    menu: {},
}));

export default Home;
