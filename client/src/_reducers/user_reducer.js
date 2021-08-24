import {
    AUTH_USER,
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER,
    PROFILE_USER,
    PROFILE_USER_EDIT,
    BOARD_VIEW,
    POST_VIEW,
    ADD_COMMENT,
    COMMENT_VIEW,
    FILTER_SEARCH,
    POST_RECOM,
    POST_RECOMDEL,
    POST_UPDATE,
    FILE_UPLOAD,
    FILE_DOWNLOAD,
    POST_WRITE,
    POST_DELETE,
    ADMIN_NOTICE,
    NOTICE_VIEW
} from '../_actions/types'

export default function (state={}, action){
    switch (action.type){
        case AUTH_USER:
            return {...state, authData: action.payload}
            break;
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
        case POST_VIEW:
            return {...state, weatherSuccess : action.payload}
            break;
        case ADD_COMMENT:
            return {...state, commentSuccess : action.payload}
            break;
        case COMMENT_VIEW:
            return {...state, commentElement : action.payload}
            break;
        case FILTER_SEARCH:
            return {...state, filterElement : action.payload}
            break;
        case POST_RECOM:
            return {...state, recomSuccess : action.payload}
            break;
        case POST_RECOMDEL:
            return {...state, recomDelSuccess : action.payload}
            break;
        case POST_UPDATE:
            return {...state, updateSuccess : action.payload}
            break;
        case FILE_UPLOAD:
            return {...state, fileUploadSuccess : action.payload}
            break;
        case FILE_DOWNLOAD:
            return {...state, fileDownloadSuccess : action.payload}
            break;
        case POST_WRITE:
            return {...state, writeSuccess : action.payload}
            break;
        case POST_DELETE:
            return {...state, deleteSuccess : action.payload}
            break;
        case ADMIN_NOTICE:
            return {...state, noticeSuccess : action.payload}
            break;
        case NOTICE_VIEW:
            return {...state, noticeElement : action.payload}
            break;
        default:
            return state;
    }
}