import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {registerUser} from '../../../_actions/user_action'
import PopupDom from './PopupDom';
import PopupContent from './PopupContent';
import { withRouter } from 'react-router-dom';

function RegisterPage(props) {
    const dispatch = useDispatch();
    
    const [Id, setId] = useState("")
    const [Password, setPassword] = useState("")
    const [Password2, setPassword2] = useState("")
    const [Username, setUsername] = useState("")
    const [Nick, setNick] = useState("")
    const [Birth, setBirth] = useState("")
    const [Mail, setMail] = useState("")
    const [PhonePrefix, setPhonePrefix] = useState("")
    const [PhoneInfix, setPhoneInfix] = useState("")
    const [PhonePostfix, setPhonePostfix] = useState("")
    const [Address, setAddress] = useState("")
    const [SubAddress,setSubAddress] = useState("")
    const [ZipCode,setZipCode] = useState("")
    const [childWindow,setChildWindow] = useState(false);

    const openDiv = (event) =>{
        setChildWindow(true);
        document.getElementById('post_content').removeAttribute('hidden');
    }
    const closeDiv = (event) =>{
        setChildWindow(false);
    }

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

    const onPhonePrefixHandler = (event) =>{
        const value = event.currentTarget.value;
        let modeValue='';
        if (value.length>3){
            modeValue=value.substring(0,3);
        }else{
            modeValue=value;
        }
        setPhonePrefix(modeValue);
    }

    const removeReadOnly = () =>{
        document.getElementById('phonePrefix').removeAttribute('readOnly');
    }

    const onPhoneInfixHandler = (event) =>{
        const value = event.currentTarget.value;
        const modValue = value.substring(0,4);
        setPhoneInfix(modValue);
    }
    
    const onPhonePostfixHandler = (event) =>{
        const value = event.currentTarget.value;
        const modValue = value.substring(0,4);
        setPhonePostfix(modValue);
    }

    const onSubAddressHandler = (event) =>{
        setSubAddress(event.currentTarget.value);
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
            phonePrefix:PhonePrefix,
            phoneInfix:PhoneInfix,
            phonePostfix:PhonePostfix,
            address:Address,
            subaddress:SubAddress,
            zipcode:ZipCode
        }
        dispatch(registerUser(body))
        .then(response=>{
            if (response.payload.registerSuccess){
                alert('환영합니다!');
                props.history.push({
                    pathname:"/"
                });
            }else{
                alert('Error');
                props.history.push({
                    pathname:"/"
                })
            }
        })
        
    }

    return (
        <div style={{
            display:'flex',justifyContent:'center',alignItems: 'center',
            width:'50%',height:'100vh', minHeight:'100px', margin:'auto'
        }}>
            <form style={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}
                onSubmit={onSubmitHandler}
            >
                <label style={{width:"50%"}}>ID</label>
                <input type="text" style={{width:"50%"}} value={Id} onChange={onIdHandler}/>
                <label style={{width:"50%"}}>Password</label>
                <input style={{width:"50%"}} type="password" value={Password} onChange={onPasswordHandler} />
                <label style={{width:"50%"}}>Password 확인</label>
                <input style={{width:"50%"}} type="password" value={Password2} onChange={onPassword2Handler} />
                <label style={{width:"50%"}}>유저 이름</label>
                <input style={{width:"50%"}} type="text" value={Username} onChange={onUsernameHandler} />
                <label style={{width:"50%"}}>닉네임</label>
                <input style={{width:"50%"}} type="text" value={Nick} onChange={onNickHandler} />
                <label style={{width:"50%"}}>생일</label>
                <input style={{width:"50%"}} type="date" value={Birth} onChange={onBirthHandler} />
                <label style={{width:"50%"}}>메일</label>
                <input style={{width:"50%"}} type="text" value={Mail} onChange={onMailHandler} />
                {/*<input value={Mail}> @ <select value={mailISP} > (option is.. daum.net, naver.com, gmail.com.... if option=etc, input readOnly is deleted.*/}
                <label style={{width:"10%"}}>핸드폰</label>
                <input style={{width:"10%",marginRight:"2%"}} type="button" value="직접 입력" onClick={removeReadOnly}/>
                <span style={{width:"28%"}}/>
                <input style={{border:"none", width:"7%"}} type="number" name="phonePrefix" id="phonePrefix" value={PhonePrefix} onChange={onPhonePrefixHandler} minLength={2} maxLength={3} readOnly={true} />
                <select style={{width:"7%"}} value={PhonePrefix} onChange={onPhonePrefixHandler}>
                    <option value="none">=== 선택 ===</option>
                    <option value="02">02</option>
                    <option value="031">031</option>
                    <option value="032">032</option>
                    <option value="033">033</option>
                    <option value="041">041</option>
                    <option value="042">042</option>
                    <option value="043">043</option>
                    <option value="044">044</option>
                    <option value="051">051</option>
                    <option value="052">052</option>
                    <option value="053">053</option>
                    <option value="054">054</option>
                    <option value="055">055</option>
                    <option value="061">061</option>
                    <option value="062">062</option>
                    <option value="063">063</option>
                    <option value="064">064</option>
                    <option value="070">070</option>
                    <option value="010">010</option>
                    <option value="011">011</option>
                    <option value="016">016</option>
                    <option value="017">017</option>
                    <option value="018">018</option>
                    <option value="019">019</option>
                </select>
                -
                <input style={{border:"0.2", width:"16%"}} type="number" name="phoneInfix" id="phoneInfix" minLength={4} maxLength={4} value={PhoneInfix} onChange={onPhoneInfixHandler}/>
                -
                <input style={{border:"0.2", width:"16%"}} type="number" name="phonePostfix" id="phonePostfix" minLength={4} maxLength={4} value={PhonePostfix} onChange={onPhonePostfixHandler}/>                                             
                <label style={{width:"50%"}}>주소</label>
                <input style={{width:"40%"}} type="text" value={Address} readOnly/>
                <span style={{width:"10%"}} id='popupDom' onClick={openDiv}>주소 찾기</span>
                    <div id='post_content' style={{width:"100%"}} hidden>
                        {childWindow && <PopupDom><PopupContent setAddress={setAddress} setZipCode={setZipCode} closeDiv={closeDiv}/></PopupDom>}
                    </div>
                <label style={{width:"50%"}}>추가 주소</label>
                <input style={{width:"50%"}} type="text" value={SubAddress} onChange={onSubAddressHandler}/>
                <span style={{width:"85%"}}/>

                <button style={{width:"15%",textAlign:'center'}}>
                    RegisterPage
                </button>
            </form>
            
        </div>
    )
}

export default withRouter(RegisterPage)
