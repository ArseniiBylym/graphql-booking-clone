import {createContext} from 'react';

const Context = createContext({
    isAuth: false,
    user: null,
    allCities: null,
    selectedCity: null,
    showNotification: false,
    notificationText: '',

})

export default Context;