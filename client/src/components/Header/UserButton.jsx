import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import Context from 'store/context';
import {makeStyles} from '@material-ui/core/styles';
import {MdClose, MdAccountCircle, MdPermIdentity, MdEventNote, MdExitToApp, MdInput, MdLibraryBooks} from 'react-icons/md';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import {LOGOUT} from 'store/actionTypes'

const authUserActions = [
    {icon: <MdPermIdentity />, name: 'Profile', path: '/profile'}, 
    {icon: <MdEventNote />, name: 'Reserves', path: '/reserves'},
    {icon: <MdExitToApp />, name: 'Logout', path: '/logout'},
];
const unAuthUserActions = [
    {icon: <MdLibraryBooks />, name: 'Register', path: '/register'},
    {icon: <MdInput />, name: 'Login', path: '/login'},
]

const UserMenuButton = props => {
    const {state, dispatch} = useContext(Context);
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const menuItemClickHandler = path => e => {
        setOpen(false);
        if (path === '/logout') {
            dispatch({type: LOGOUT})
        } else {
            props.history.push(path)
        }
    }

    const getActionsList = () => {
        return state.isAuth ? authUserActions : unAuthUserActions;
    }

    return (
        <div>
            <SpeedDial
                ariaLabel="User menu button"
                classes={{
                    root: classes.root,
                    fab: classes.fab,
                }}
                className={classes.menuButton}
                icon={
                    <SpeedDialIcon
                        icon={<MdAccountCircle />}
                        openIcon={<MdClose />}
                        classes={{
                            root: classes.icon,
                        }}
                    />
                }
                onBlur={() => setOpen(false)}
                onClick={() => setOpen(!open)}
                onClose={() => setOpen(false)}
                onFocus={() => setOpen(true)}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                open={open}
                direction="down"
            >
                {getActionsList().map(action => (
                    <SpeedDialAction
                        classes={{
                            button: classes.iconItem
                        }}
                        onClick={menuItemClickHandler(action.path)}
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen={true}
                        tooltipPlacement="left"
                    />
                ))}
            </SpeedDial>
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        right: 0,
        top: 0,
    },
    fab: {
        boxShadow: 'none',
        '&:active': {
            boxShadow: 'none',
        },
    },
    icon: {
        fontSize: '1.5rem',
        lineHeight: '1rem',
    },
    iconItem: {
        fontSize: '1.5rem',
        lineHeight: '1rem',
    }
}));

export default withRouter(UserMenuButton);
