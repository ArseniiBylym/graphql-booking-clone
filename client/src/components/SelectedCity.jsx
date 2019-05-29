import React, {useContext} from 'react';
import {Link} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles';

import Context from 'store/context';
import Typography from '@material-ui/core/Typography';

const SelectedCity = props => {
    const classes = useStyles();
    const {state} = useContext(Context);

    return (
        <>
            {state.selectedCity && 
                <Link to='/' className={classes.link}>
                    <Typography variant="h5" align="center">
                        {state.selectedCity.name}
                    </Typography>
                </Link>
            }
        </>
    );
};

const useStyles = makeStyles(theme => ({
    link: {
        textDecoration: 'none',
        color: 'inherit'
    },
}));

export default SelectedCity;
