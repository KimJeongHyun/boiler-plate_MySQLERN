import axios from 'axios';
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {loginUser} from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom';


function LoginPage(props){
    const dispatch = useDispatch();

    const [Id, setId] = useState("")
    const [Password, setPassword] = useState("")

    const onIdHandler = (event) =>{
        setId(event.currentTarget.value);
    }

    const onPasswordHandler = (event) =>{
        setPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (event) =>{
        event.preventDefault();
        let body={
            id:Id,
            password:Password
        }
        dispatch(loginUser(body))
        .then(response=>{
            if (response.payload.loginSuccess){
                props.history.push({
                    pathname:"/",
                    state :{Id:Id}
                });
            }else{
                alert('Error');
            }
        })
        
    }

    return(
        <div style={{
            display:'flex',justifyContent:'center',alignItems: 'center',
            width:'100%',height:'100vh'
        }}>
            <form style={{display:'flex', flexDirection:'column'}}
                onSubmit={onSubmitHandler}
            >
                <label>Id</label>
                <input type="text" value={Id} onChange={onIdHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button>
                    LoginPage
                </button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)