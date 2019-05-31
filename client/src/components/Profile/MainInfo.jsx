import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import DefaultAvatar from 'images/defaultUser.jpg';


const MainInfo = ({picture, name, email, phone}) => {
    const classes = useStyles();
    return (
        <>
            <Avatar
                src={picture || DefaultAvatar}
                classes={{
                    root: classes.avatar,
                }}
            />
            <Typography variant="h6" align="center" gutterBottom>
                {name}
            </Typography>
            <Typography variant="h6" align="center" gutterBottom>
                {email}
            </Typography>
            {phone && (
                <Typography variant="p" align="center" gutterBottom>
                    {phone}
                </Typography>
            )}
        </>
    );
};

const useStyles = makeStyles(theme => ({
    root: {

    },
    avatar: {
        width: '100px',
        height: '100px',
        margin: '2rem auto',
    },
})) 

export default MainInfo;
