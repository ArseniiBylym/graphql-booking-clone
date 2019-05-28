import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import Context from 'store/context';
import {makeStyles} from '@material-ui/core/styles';
import {MdMenu, MdHome, MdMap, MdClose} from 'react-icons/md';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

const actions = [{icon: <MdHome />, name: 'Places', path: '/places'}, {icon: <MdMap />, name: 'Map', path: '/map'}];

const MainMenuButton = props => {
    const {state} = useContext(Context);
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const menuItemClickHandler = path => e => {
        setOpen(false);
        if (state.selectedCity) {
            props.history.push(path)
        }
    }

    return (
        <div>
            <SpeedDial
                ariaLabel="Main menu button"
                classes={{
                    root: classes.root,
                    fab: classes.fab,
                }}
                className={classes.menuButton}
                icon={
                    <SpeedDialIcon
                        icon={<MdMenu />}
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
                {actions.map(action => (
                    <SpeedDialAction
                        classes={{
                            button: classes.iconItem
                        }}
                        onClick={menuItemClickHandler(action.path)}
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen={true}
                        tooltipPlacement="right"
                    />
                ))}
            </SpeedDial>
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        left: 0,
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

export default withRouter(MainMenuButton);
