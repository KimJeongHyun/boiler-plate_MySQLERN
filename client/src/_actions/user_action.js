import axios from "axios";
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
} from './types';

export function loginUser(dataToSubmit){
    const request=axios.post('/api/loginUser',dataToSubmit)
    .then(response=>response.data);

    return {
        type:LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit){
    const request=axios.post('/api/registerUser',dataToSubmit)
    .then(response=>response.data);

    return {
        type:REGISTER_USER,
        payload: request
    }
}

export function logout(){
    const request=axios.get('/api/logout')
    .then(response=>response.data);

    return {
        type:LOGOUT_USER,
        payload: request
    }
}

export function profileUser(){
    const request=axios.get('/api/myProfile')
    .then(response=>response.data);

    return {
        type:PROFILE_USER,
        payload: request
    }
}

export function profileUserEdit(dataToSubmit){
    const request=axios.post('/api/myProfileEdit',dataToSubmit)
    .then(response=>response.data);

    return {
        type:PROFILE_USER_EDIT,
        payload: request
    }
}

export function boardView(props){
    const request=axios.get('/api/board/list/'+props)
    .then(response=>response.data);

    return {
        type:BOARD_VIEW,
        payload: request
    }
}

export function postView(props){
    const request=axios.get('/api/post/'+props)
    .then(response=>response.data);

    return {
        type:POST_VIEW,
        payload: request
    }
}

export function postRecom(props){
    const request=axios.get('/api/recommend/'+props)
    .then(response=>response.data);

    return {
        type:POST_RECOM,
        payload: request
    }
}

export function postRecomDel(props){
    const request=axios.get('/api/recommendDel/'+props)
    .then(response=>response.data);

    return {
        type:POST_RECOMDEL,
        payload: request
    }
}

export function postWrite(props,dataToSubmit){
    const request=axios.post('/api/write/'+props,dataToSubmit)
    .then(response=>response.data);

    return {
        type:POST_WRITE,
        payload: request
    }
}

export function postDelete(props){
    const request=axios.get('/api/board/delete/'+props)
    .then(response=>response.data);

    return {
        type:POST_DELETE,
        payload: request
    }
}