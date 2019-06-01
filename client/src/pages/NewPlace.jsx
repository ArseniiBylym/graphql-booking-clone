import React, {useState, useEffect, useContext} from 'react';
import Context from 'store/context'
import { makeStyles } from '@material-ui/styles';
import client from 'apolloClient';

const NewPlace = props => {
    const classes = useStyles();
    const {state, dispatch} = useContext(Context);

    if (!state.isAuth) props.history.push('/login')
    return (
        <div>New place form</div>
    )
}

const useStyles = makeStyles(theme => ({

}))

export default NewPlace;