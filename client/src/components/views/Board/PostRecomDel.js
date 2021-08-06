import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import { Redirect } from 'react-router-dom';
import {postRecomDel} from '../../../_actions/user_action'


function PostRecomDel(props){

    const [ServerRes, setServerRes] = useState(false);

    const dispatch = useDispatch();
    dispatch(postRecomDel(props.idx))
        .then(response=>{
            if (response.payload.recomDelSuccess=='none'){
                setServerRes('none');
            }else if (response.payload.recomDelSuccess){
                setServerRes(true);
            }else{
                setServerRes(false);
            }
            
        })

    const resultRendering = () =>{
        if (ServerRes=='none'){
            return(
                <div>
                    <Redirect to={'/post/'+props.idx}/>
                </div>
            )
        }else if (ServerRes){
            return(
                <div>
                    <Redirect to={'/post/'+props.idx}/>
                </div>
            )
        }else{
            return(
                <div>

                </div>
            )
        }
    }

    return(
        <div>
            {resultRendering()}
        </div>
    )

}

export default PostRecomDel