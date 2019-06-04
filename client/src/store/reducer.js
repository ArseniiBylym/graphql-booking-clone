import {
    LOGIN,
    REGISTER,
    LOGOUT,
    INIT_CITIES,
    SET_CURRENT_CITY,
    SHOW_NOTIFICATION,
    HIDE_NOTIFICATION,
} from './actionTypes';

const reducer = (state, {type, payload}) => {
    switch (type) {
        case REGISTER: 
        case LOGIN: 
            return {
                ...state,
                isAuth: true,
                user: payload,
            }
        case LOGOUT: 
            return {
                ...state,
                isAuth: false,
                user: null,
            }
        case INIT_CITIES: 
            return {
                ...state,
                allCities: payload
            }
        case SET_CURRENT_CITY: {
            const {name, _id, location: {lat, long}} = payload;
            return {
                ...state,
                selectedCity: {
                    name,
                    _id,
                    location: {lat, long}
                }
            }
        }
        case SHOW_NOTIFICATION: {
            return {
                ...state,
                showNotification: true,
                notificationText: payload
            }
        }
        case HIDE_NOTIFICATION: {
            return {
                ...state,
                showNotification: false,
                notificationText: ''
            }
        }
        default: 
            return state
    }
}

export default reducer;
