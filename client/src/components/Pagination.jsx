import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const Pagination = props => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            Pagination
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        
    }
});

export default Pagination;