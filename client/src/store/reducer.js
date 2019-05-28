import {USER_ACTIONS} from './actionTypes';

export const UserReducer = (state, {type, payload}) => {
    switch (type) {
        case USER_ACTIONS.REGISTER: 
        case USER_ACTIONS.LOGIN: 
            return {
                isAuth: true,
                user: payload,
            }
        case USER_ACTIONS.LOGOUT: 
            return {
                isAuth: false,
                user: null,
            }
        default: 
            return state
    }
}
