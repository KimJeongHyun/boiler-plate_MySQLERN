import React, {useState, useMemo} from 'react'
import {useDispatch} from 'react-redux'
import {profileUser,profileUserEdit} from '../../../_actions/user_action'
import PopupDom from '../RegisterPage/PopupDom';
import PopupContent from '../RegisterPage/PopupContent';


function ProfileUserEdit(props){

    const [Rows, setRows] = useState("")
    const [Birth, setBirth] = useState("")
    const [PhonePrefix, setPhonePrefix] = useState("")
    const [PhoneInfix, setPhoneInfix] = useState("")
    const [PhonePostfix, setPhonePostfix] = useState("")
    const [Address, setAddress] = useState("")
    const [SubAddress,setSubAddress] = useState("")
    const [ZipCode, setZipCode] = useState("")
    const [childWindow,setChildWindow] = useState(false);

    const openDiv = (event) =>{
        setChildWindow(true);
        document.getElementById('post_content').removeAttribute('hidden');
    }
    const closeDiv = (event) =>{
        setChildWindow(false);
    }

    const onBirthHandler = (event) =>{
        setBirth(event.currentTarget.value);
    }

    const onPhonePrefixHandler = (event) =>{
        setPhonePrefix(event.currentTarget.value);
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

    const onZipCodeHandler = (event) =>{
        setZipCode(event.currentTarget.value);
    }

    const dispatch = useDispatch();

    dispatch(profileUser())
        .then(response=>{
            const result = response.payload;
            setRows(result.rows);
    })

    const onSubmitHandler = (event) =>{
        event.preventDefault();
        let body={
            birth:Birth,
            phonePrefix:PhonePrefix,
            phoneInfix:PhoneInfix,
            phonePostfix:PhonePostfix,
            address:Address,
            subaddress:SubAddress,
            zipcode:ZipCode
        }
        dispatch(profileUserEdit(body))
        .then(response=>{
            if (response.payload.profileEditSuccess){
                props.history.push({
                    pathname:"/myProfile",

                });
            }else{
                alert('Error');
                props.history.push({
                    pathname:"/myProfile"
                })
            }
        })
        
    }

    return(
        <div>
            <form style={{display:'flex', flexDirection:'column'}}
                onSubmit={onSubmitHandler}
            >
                <h1 style={{width:"100%", minWidth:"400px"}}>User Profile Edit</h1>
                <label>ID</label>
                <span>{Rows.id}</span>
                <label>이름</label>
                <span>{Rows.uname}</span>
                <label>닉네임</label>
                <span>{Rows.nick}</span>
                <label>생일</label>
                <input style={{border:"0.2", width:"30%"}} type="date" name="birth" value={Birth} onChange={onBirthHandler}/>                                            
                <label>전화번호</label>
                <input style={{border:"none", width:"5%"}} type="text" name="phonePrefix" id="phonePrefix" value={PhonePrefix} onChange={onPhonePrefixHandler} readOnly />
                <select value={PhonePrefix} onChange={onPhonePrefixHandler}>
                <option value="none" selected>=== 선택 ===</option>
                    <option value="etc">직접 입력</option>
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
                <input style={{border:"0.2", width:"10%"}} type="number" name="phoneInfix" id="phoneInfix" minLength={4} maxLength={4} value={PhoneInfix} onChange={onPhoneInfixHandler}/>
                -
                <input style={{border:"0.2", width:"10%"}} type="number" name="phonePostfix" id="phonePostfix" minLength={4} maxLength={4} value={PhonePostfix} onChange={onPhonePostfixHandler}/>                                             
                <input type="text" value={Address} readOnly/>
                <input type="text" value={ZipCode} readOnly/>
                <div id='post_content' hidden>
                    {childWindow && <PopupDom><PopupContent setAddress={setAddress} setZipCode={setZipCode} closeDiv={closeDiv}/></PopupDom>}
                </div>
                <span id='popupDom' onClick={openDiv}> 주소 찾기</span>
                <label>추가 주소 </label>
                <input type="text" value={SubAddress} onChange={onSubAddressHandler}/>
                <br/>
                <br/>
                <button>
                    Profile Edit
                </button>
            </form>
        </div>
    )

}

export default ProfileUserEdit