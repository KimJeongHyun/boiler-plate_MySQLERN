import axios from 'axios';
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {registerUser} from '../../../_actions/user_action'

function RegisterPage() {
    const dispatch = useDispatch();

    const [Id, setId] = useState("")
    const [Password, setPassword] = useState("")
    const [Password2, setPassword2] = useState("")
    const [Username, setUsername] = useState("")
    const [Nick, setNick] = useState("")
    const [Birth, setBirth] = useState("")
    const [Mail, setMail] = useState("")
    const [Phone, setPhone] = useState("")
    const [Address, setAddress] = useState("")

    const onIdHandler = (event) =>{
        setId(event.currentTarget.value);
    }

    const onPasswordHandler = (event) =>{
        setPassword(event.currentTarget.value);
    }
    const onPassword2Handler = (event) =>{
        setPassword2(event.currentTarget.value);
    }

    const onUsernameHandler = (event) =>{
        setUsername(event.currentTarget.value);
    }

    const onNickHandler = (event) =>{
        setNick(event.currentTarget.value);
    }
    const onBirthHandler = (event) =>{
        setBirth(event.currentTarget.value);
    }

    const onMailHandler = (event) =>{
        setMail(event.currentTarget.value);
    }
    const onPhoneHandler = (event) =>{
        setPhone(event.currentTarget.value);
    }

    const onAddressHandler = (event) =>{
        setAddress(event.currentTarget.value);
    }
    


    const onSubmitHandler = (event) =>{
        event.preventDefault();
        let body={
            id:Id,
            password:Password,
            password2:Password2,
            username:Username,
            nick:Nick,
            birth:Birth,
            mail:Mail,
            phone:Phone,
            address:Address

        }
        dispatch(registerUser(body))
        
    }

    return (
        <div style={{
            display:'flex',justifyContent:'center',alignItems: 'center',
            width:'100%',height:'100vh'
        }}>
            <form style={{display:'flex', flexDirection:'column'}}
                onSubmit={onSubmitHandler}
            >
                <label>ID</label>
                <input type="text" value={Id} onChange={onIdHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <label>Password 확인</label>
                <input type="password" value={Password2} onChange={onPassword2Handler} />
                <label>유저 이름</label>
                <input type="text" value={Username} onChange={onUsernameHandler} />
                <label>닉네임</label>
                <input type="text" value={Nick} onChange={onNickHandler} />
                <label>생일</label>
                <input type="date" value={Birth} onChange={onBirthHandler} />
                <label>메일</label>
                <input type="text" value={Mail} onChange={onMailHandler} />
                <label>핸드폰</label>
                <input type="text" value={Phone} onChange={onPhoneHandler} />
                <label>주소</label>
                <input type="text" value={Address} onChange={onAddressHandler} />
                <br />
                <button>
                    RegisterPage
                </button>
            </form>
        </div>
    )
}

export default RegisterPage
