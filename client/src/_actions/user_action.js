import axios from "axios";
import download from 'js-file-download';

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
    FILE_UPLOAD,
    FILE_DOWNLOAD,
    POST_WRITE,
    POST_DELETE
} from './types';

export function auth(){
    const request=axios.get('/api/getSession')
    .then(response=>response.data);

    return {
        type:AUTH_USER,
        payload: request
    }
}

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

export function profileUser(props){
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

export function addComment(props,dataToSubmit){
    const request=axios.post('/api/comment/'+props,dataToSubmit)
    .then(response=>response.data);

    return {
        type:ADD_COMMENT,
        payload: request
    }
}

export function commentView(props){
    const request=axios.get('/api/commentView/'+props)
    .then(response=>response.data);

    return {
        type:COMMENT_VIEW,
        payload: request
    }
}

export function filterSearch(dataToSubmit){
    const request=axios.post('/api/filterSearch',dataToSubmit)
    .then(response=>response.data);

    return {
        type:FILTER_SEARCH,
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

export function fileUpload(props,dataToSubmit){
    const request=axios.post('/api/upload/'+props,dataToSubmit,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(response=>response.data);
    return {
        type:FILE_UPLOAD,
        payload: request
    }
}

export function fileDownload(idx,name){
    const request=axios.get('/api/fileDownload/'+idx+'/'+name,{responseType:'blob'})
    .then(response=>{
        download(response.data,name)
    });
    return{
        type:FILE_DOWNLOAD,
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