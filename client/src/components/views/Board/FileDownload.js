import React from 'react'
import {useDispatch} from 'react-redux'
import {fileDownload} from '../../../_actions/user_action'
import { withRouter ,Redirect } from 'react-router-dom';

function FileDownload(props){
    console.log(props.idx,props.name);
    const dispatch = useDispatch();
    dispatch(fileDownload(props.idx,props.name))
    .then(response=>{
    })

    return(
        <Redirect to={'/post/'+props.idx}/>
    )
}

export default withRouter(FileDownload);