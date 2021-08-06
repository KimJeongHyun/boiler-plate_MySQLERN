import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import { Redirect } from 'react-router-dom';
import {postRecom} from '../../../_actions/user_action'


function PostRecom(props){

    const [ServerRes, setServerRes] = useState(false);
    
    const dispatch = useDispatch();
    dispatch(postRecom(props.idx))
        .then(response=>{
            switch (response.payload.recomSuccess){
                case true:
                    setServerRes(true);
                    break;
                case false:
                    setServerRes(false);
                    break;
                case 'none':
                    setServerRes('none');
                    break;
                case 'PostUser':
                    setServerRes('PostUser');
                    break;
                case 'AlreadyRecom':
                    setServerRes('AlreadyRecom');
                    break;
                default:
                    return;
            }            
        })

    const resultRendering = () =>{
        console.log(ServerRes);
        switch (ServerRes){
            case true:
                return(
                    <div>
                        <Redirect to={'/post/'+props.idx}/>
                    </div>
                )
                break;
            case false:
                return(
                    <div>
                        
                    </div>
                )
                break;
            case 'none':
                return(
                    <div>
                        <Redirect to={'/post/'+props.idx}/>
                    </div>
                )
                break;
            case 'PostUser':
                return(
                    <div>
                        {alert('작성자는 추천을 누를 수 없습니다.')}
                        <Redirect to={'/post/'+props.idx}/>
                    </div>
                )
                break;
            case 'AlreadyRecom':
                return(
                    <div>
                        {alert('이미 추천을 누른 게시물입니다.')}
                        <Redirect to={'/post/'+props.idx}/>
                    </div>
                )
                break;
            default:
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

export default PostRecom