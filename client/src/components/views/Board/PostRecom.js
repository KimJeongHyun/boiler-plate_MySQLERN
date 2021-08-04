import React from 'react'
import {useDispatch} from 'react-redux'
import { Redirect } from 'react-router-dom';
import {postRecom} from '../../../_actions/user_action'


function PostRecom(props){
    const dispatch = useDispatch();
    dispatch(postRecom(props.match.params.idx))
        .then(response=>{
            
        })
    return(
        <div>
            <Redirect to={'/post/'+props.match.params.idx}/>
        </div>
    )

}

export default PostRecom