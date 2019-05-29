import {createContext} from 'react';

const Context = createContext({
    isAuth: false,
    user: null,
    allCities: null,
    selectedCity: null,

})

export default Context;