import React, {useContext, useEffect, useState} from 'react';
import Context from 'store/context';
import {Redirect} from 'react-router';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { MUTATION_REGISTER } from 'graphqlTypes/mutations';
import client from 'apolloClient';
import { REGISTER } from 'store/actionTypes';

const Register = () => {
    const classes = useStyles();
    const {state, dispatch} = useContext(Context);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [errors, setErrors] = useState([])

    const handleSubmit = e => {
        e.preventDefault();
        registerUser();
    }

    const registerUser = async() => {
        const variables = {name, email, password, passwordConfirm}
        const {data, errors} = await client.mutate({
            errorPolicy: 'all',
            mutation: MUTATION_REGISTER,
            variables
        })
        if (errors) {
            const registerErrors = errors[0].extensions.exception.errorList;
            setErrors(registerErrors);
        }
        if (data.registerUser) {
            const {user, token} = data.registerUser;
            localStorage.setItem('token', token)
            dispatch({type: REGISTER, payload: user})
        }
    }

    const getInputError = name  => {
        const error = errors.find(item => item[name])
        return error;
    }

    const getErrorMessage = name => {
        const error = errors.find(item => item[name])
        return error ? error[name] : ''
    }

    if (state.isAuth) {
        return <Redirect to='/places'/>
    }
    return (
        <Grid container className={classes.root} alignItems="center" justify="center">
            <Paper className={classes.paper} >
                <Typography color="primary" className={classes.title} component="h1" variant="h6" align="center">Register</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        type="text"
                        label="Name"
                        className={classes.textField}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        error={getInputError('name')}
                        helperText={getErrorMessage('name')}
                        required
                    />
                    <TextField
                        type="email"
                        label="Email"
                        className={classes.textField}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        error={getInputError('email')}
                        helperText={getErrorMessage('email')}
                        required
                    />
                    <TextField
                        type="password"
                        label="Password"
                        className={classes.textField}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        error={getInputError('password')}
                        helperText={getErrorMessage('password')}
                        required
                    />
                     <TextField
                        type="password"
                        label="Confirm password"
                        className={classes.textField}
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        error={getInputError('passwordConfirm')}
                        helperText={getErrorMessage('passwordConfirm')}
                        required
                    />
                    <Button className={classes.button} color="primary" variant="contained" disabled={!name || !email || !password || !passwordConfirm} type="submit">Register</Button>
                </form>
            </Paper>
        </Grid>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
    },
    paper: {
        width: '100%',
        margin: '0 2rem',
        padding: theme.spacing(3),
        
    },
    form: {
        display: 'flex',
        flexFlow: 'column nowrap'
    },
    button: {
        marginTop: theme.spacing(2)
    }
}))

export default Register;