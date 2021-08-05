import {
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER,
    PROFILE_USER,
    PROFILE_USER_EDIT,
    BOARD_VIEW,
    POST_VIEW,
    POST_RECOM,
    POST_RECOMDEL,
    POST_WRITE,
    POST_DELETE
} from '../_actions/types'

export default function (state={}, action){
    switch (action.type){
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload}
            break;
        case REGISTER_USER:
            return {...state, registerSuccess : action.payload}
            break;
        case LOGOUT_USER:
            return {...state, logoutSuccess : action.payload}
            break;
        case PROFILE_USER:
            return {...state, profileElement : action.payload}
            break;
        case PROFILE_USER_EDIT:
            return {...state, profileEditSuccess : action.payload}
            break;         
        case BOARD_VIEW:
            return {...state, boardElement : action.payload}
            break;
        case POST_VIEW:
            return {...state, postElement : action.payload}
            break;
        case POST_RECOM:
            return {...state, recomSuccess : action.payload}
            break;
        case POST_RECOMDEL:
            return {...state, recomDelSuccess : action.payload}
            break;
        case POST_WRITE:
            return {...state, writeSuccess : action.payload}
            break;
        case POST_DELETE:
            return {...state, deleteSuccess : action.payload}
            break;
        default:
            return state;
    }
}