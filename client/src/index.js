import React, {useContext, useReducer} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {ApolloProvider} from 'react-apollo';

import client from './apolloClient';
import ThemeProvider from './themeProvider';
import Context from 'store/context';
import reducer from 'store/reducer';
import MainRoute from './mainRoute';

const App = () => {
    const initialState = useContext(Context);
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <Router>
            <ApolloProvider client={client}>
                <ThemeProvider>
                    <Context.Provider value={{state, dispatch}}>
                        <MainRoute />
                    </Context.Provider>
                </ThemeProvider>
            </ApolloProvider>
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
