import { STATUS_CODES } from 'http';
import {
    LOGIN_USER,
    REGISTER_USER,
    BOARD_VIEW,
    LOGOUT_USER
} from '../_actions/types'

export default function (state={}, action){
    switch (action.type){
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload}
            break;
        case REGISTER_USER:
            return {...state, registerSuccess : action.payload}
            break;
        case BOARD_VIEW:
            return {...state, boardElement : action.payload}
            break;
        case LOGOUT_USER:
            return {...state, logoutSuccess : action.payload}
            break;
        default:
            return state;
    }
}