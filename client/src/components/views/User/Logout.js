import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import { Redirect } from 'react-router-dom';
import {logout} from '../../../_actions/user_action'


function Logout(){
    const [ServerRes, setServerRes] = useState(false);

    const dispatch = useDispatch();
    dispatch(logout())
        .then(response=>{
            if (response.payload.logoutSuccess){
                setServerRes(true);
            }else{
                setServerRes(false);
            }
        })

    const logoutRendering = (ServerRes) =>{
        if (ServerRes){
            return(
                <div>
                    {alert('로그아웃 되었습니다.'),
                        <div>
                            <Redirect to ='/'/>
                        </div>
                    }
                    
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
            {logoutRendering(ServerRes)}
        </div>
        
        
    )

}

export default Logout