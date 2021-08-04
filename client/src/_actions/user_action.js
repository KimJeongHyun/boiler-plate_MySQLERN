import axios from "axios";
import {
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER,
    BOARD_VIEW,
    POST_VIEW,
    POST_RECOM,
    POST_RECOMDEL
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