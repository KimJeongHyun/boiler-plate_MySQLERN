import React from 'react'
import {useDispatch} from 'react-redux'
import { Redirect } from 'react-router-dom';
import {postDelete} from '../../../_actions/user_action'


function PostDelete(props){
    const dispatch = useDispatch();
    dispatch(postDelete(props.match.params.idx))
        .then(response=>{
            
        })
    return(
        <div>
            <Redirect to={'/board/list/1'}/>
        </div>
    )

}

export default PostDelete