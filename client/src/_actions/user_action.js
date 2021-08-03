import axios from "axios";
import {
    LOGIN_USER,
    REGISTER_USER,
    BOARD_VIEW
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

export function boardView(){
    const request=axios.get('/api/board/list/:page')
    .then(response=>response.data);

    return {
        type:BOARD_VIEW,
        payload: request
    }
}