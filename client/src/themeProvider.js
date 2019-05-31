import React from 'react';
import {ThemeProvider} from '@material-ui/styles';
import {createMuiTheme} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import teal from '@material-ui/core/colors/teal';

const theme = createMuiTheme({
    palette: {
        primary: teal,
        light: teal[50]
    },
});

export default (props) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {props.children}
        </ThemeProvider>
    );
};

// export default MaterialUI;
