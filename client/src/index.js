import React, {useContext, useReducer} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {ApolloProvider} from 'react-apollo';

import client from './apolloClient';
import ThemeProvider from './themeProvider';
import Context from 'store/context';
import {UserReducer} from 'store/reducer';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Home from 'pages/Home';
import Places from 'pages/Places';
import Map from 'pages/Map';
import Profile from 'pages/Profile';
import Reserves from 'pages/Reserves';
import Logout from 'pages/Logout';
import Header from 'components/Header/index';

const App = () => {
    const initialState = useContext(Context);
    const [state, dispatch] = useReducer(UserReducer, initialState);
    return (
        <Router>
            <ApolloProvider client={client}>
                <ThemeProvider>
                    <Context.Provider value={{state, dispatch}}>
                        <Header />
                        <Switch>
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                            <Route path="/places" component={Places} />
                            <Route path="/map" component={Map} />
                            <Route path="/profile" component={Profile} />
                            <Route path="/reserves" component={Reserves} />
                            <Route path="/logout" component={Logout} />
                            <Route path="/" component={Home} />
                        </Switch>
                    </Context.Provider>
                </ThemeProvider>
            </ApolloProvider>
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
