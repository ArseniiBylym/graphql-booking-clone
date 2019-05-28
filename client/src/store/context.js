import {createContext} from 'react';

const Context = createContext({
    isAuth: false,
    user: null,
    selectedCity: false,
})

export default Context;