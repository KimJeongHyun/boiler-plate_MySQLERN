import React from 'react'
import {useDispatch} from 'react-redux'
import { Redirect } from 'react-router-dom';
import {postRecomDel} from '../../../_actions/user_action'


function PostRecomDel(props){
    const dispatch = useDispatch();
    dispatch(postRecomDel(props.match.params.idx))
        .then(response=>{
            
        })
    return(
        <div>
            <Redirect to={'/post/'+props.match.params.idx}/>
        </div>
    )

}

export default PostRecomDel