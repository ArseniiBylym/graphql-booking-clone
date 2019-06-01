import React, {useState, useEffect, useContext} from 'react';
import Context from 'store/context'
import { makeStyles } from '@material-ui/styles';
import client from 'apolloClient';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {MUTATION_CREATE_PLACE} from 'graphqlTypes/mutations';
import {NewPlaceLocationModal} from 'components/Modals'

const defaultForm = {
    name: '',
    address: '',
    details: '',
    roomsNumber: 1,
    mainImage: '',
    price: '',
    lat: null,
    long: null,
}

const rooms = [1, 2, 3, 4]

const NewPlace = props => {
    const classes = useStyles();
    const {state, dispatch} = useContext(Context);
    const [sending, setSending] = useState(false);
    const [form, setForm] = useState(defaultForm)

    const inputHandler = e => {
        const name = e.target.name;
        setForm({
            ...form,
           [name]: e.target.value,
        })
    }

    const setLocationHandler = ({lat, long}) => {
        setForm({
            ...form,
            lat,
            long,
        })
    }

    const sendingHandler = async() => {
        setSending(true);
        const variables = {
            ...form,
            city: state.selectedCity._id,
            price: Number(form.price)
        };
        const {data, error} = await client.mutate({
            errorPolicy: "all",
            mutation: MUTATION_CREATE_PLACE,
            variables,
            context: {
                headers: {authorization: localStorage.getItem('token')}
            }
        })
        if (data.createPlace) {
            props.history.push(`/place/${data.createPlace._id}`)
        }
    }

    const isButtonDisabled = () => {
        if (sending || !form.name || !form.address || !form.roomsNumber || !form.mainImage || !form.price || !form.lat || !form.long) {
            return true
        }
        return false
    }

    if (!state.isAuth) props.history.push('/login')
    return (
        <Grid container className={classes.root}>
            <Paper className={classes.paper}>
                <Typography varuant="h5" align="center">New place</Typography>
                <TextField
                    required
                    label="Name"
                    name="name"
                    className={classes.textField}
                    value={form.name}
                    onChange={inputHandler}
                    margin="normal"
                    variant="outlined"
                    autoFocus={true}
                    fullWidth
                />
                <TextField
                    required
                    label="Address"
                    name="address"
                    className={classes.textField}
                    value={form.address}
                    onChange={inputHandler}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                />
                <NewPlaceLocationModal setLocationHandler={setLocationHandler}/>
                 <TextField
                    label="Details"
                    name="details"
                    rows={3}
                    className={classes.textField}
                    value={form.details}
                    onChange={inputHandler}
                    margin="normal"
                    variant="outlined"
                    multiline
                    fullWidth
                />
                <TextField
                    select
                    label="Rooms number"
                    name="roomsNumber"
                    className={classes.textField}
                    value={form.roomsNumber}
                    onChange={inputHandler}
                    variant="outlined"
                    SelectProps={{
                    MenuProps: {
                        className: classes.menu,
                    },
                    }}
                    margin="normal"
                    fullWidth
                >
                    {rooms.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </TextField>
                <TextField
                    required
                    label="Image URI"
                    name="mainImage"
                    className={classes.textField}
                    value={form.mainImage}
                    onChange={inputHandler}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                />
                 <TextField
                    required
                    label="Price"
                    name="price"
                    type="number"
                    className={classes.textField}
                    value={form.price}
                    onChange={inputHandler}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                />
                <Button className={classes.sendButton} onClick={sendingHandler} disabled={isButtonDisabled()} color="primary" variant="contained">
                    {sending ? 'Saving...' : 'Create'}
                </Button>
            </Paper>
        </Grid>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        width: '100%',
        height: '100%',
    },
    paper: {
        flexGrow: 1,
        padding: theme.spacing(1),
    },
    sendButton: {
        display: 'block',
        margin: '1rem auto',
    }
}))

export default NewPlace;