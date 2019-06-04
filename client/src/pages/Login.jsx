import React, {useContext, useEffect, useState} from 'react';
import Context from 'store/context';
import {Redirect} from 'react-router';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { MUTATION_LOGIN } from 'graphqlTypes/mutations';
import client from 'apolloClient';
import { LOGIN, SHOW_NOTIFICATION } from 'store/actionTypes';

const Login = () => {
    const classes = useStyles();
    const {state, dispatch} = useContext(Context);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    const handleSubmit = e => {
        e.preventDefault();
        console.log(email, password)
        loginUser();
    }

    const loginUser = async() => {
        const variables = {email, password}
        const {data, errors} = await client.mutate({
            errorPolicy: 'all',
            mutation: MUTATION_LOGIN,
            variables
        })
        if (errors) {
            const loginErrors = errors[0].extensions.exception.errorList;
            console.log(errors)
            console.log(loginErrors)
            setErrors(loginErrors);
        }
        if (data.loginUser) {
            const {user, token} = data.loginUser;
            localStorage.setItem('token', token)
            dispatch({type: LOGIN, payload: user})
            dispatch({type: SHOW_NOTIFICATION, payload: `You are loged in as ${user.name}`})
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
                <Typography color="primary" className={classes.title} component="h1" variant="h6" align="center">Login</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        type="text"
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
                    <Button className={classes.button} color="primary" variant="contained" disabled={!email || !password} type="submit">Login</Button>
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

export default Login;