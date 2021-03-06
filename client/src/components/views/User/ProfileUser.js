import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import { Redirect } from 'react-router-dom';
import { profileUser } from '../../../_actions/user_action'
import NavBarUser from '../NavBar/NavBarUser'


function ProfileUser(){

    const [Rows,setRows] = useState('')
    const [ServerRes, setServerRes] = useState(false);
    const dispatch = useDispatch();
    dispatch(profileUser())
        .then(response=>{
            const result = response.payload;
            if (result.profileElement){
                setServerRes(true);
                setRows(result.rows);
            }else{
                setServerRes(false);
            }
            
    })

    const addressRendering = () =>{
        const result = [];
        if (typeof Rows.phone!=='undefined'){
            if (Rows.phone.length>0){
                result.push(
                    <td style={{marginLeft:"10%"}}>
                        <span>{Rows.phone.slice(0,3)}</span>-<span>{Rows.phone.slice(3,7)}</span>-<span>{Rows.phone.slice(7)}</span>
                    </td>
                )
            }else{
                result.push(
                    <td style={{marginLeft:"10%"}}>
                        <span></span>
                    </td>
                )
            }
        }else{
            result.push(
                <td style={{marginLeft:"10%"}}>
                    <span></span>
                </td>
            )
        }
        return result;
    }

    return(
        <div>
            {ServerRes ? 
            <div>
                <NavBarUser/>
                <div className= "ContentContainer" id="ContentContainer" style={{top:"50px"}}>
                    <div className="ContentField" style={{textAlign:"center"}}>
                        <div style={{display:"inline-block"}}>
                            <h1 style={{width:"20%", minWidth:"400px"}}>User Profile</h1>
                            <table style={{width:"100%"}}>
                                <tr>
                                    <td>
                                        ID
                                    </td>
                                    <td style={{marginLeft:"10%"}}>
                                        <span>{Rows.id}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        ??????
                                    </td>
                                    <td style={{marginLeft:"10%"}}>
                                        <span>{Rows.uname}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        ?????????
                                    </td>
                                    <td style={{marginLeft:"10%"}}>
                                        <span>{Rows.nick}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        ??????
                                    </td>
                                    <td style={{marginLeft:"10%"}}>
                                        <span>{Rows.birthF}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        ????????????
                                    </td>
                                    {addressRendering()}
                                </tr>
                                <tr>
                                    <td>
                                        ??????
                                    </td>
                                    <td style={{marginLeft:"10%"}}>
                                        <span>{Rows.address}</span>
                                    </td>
                                </tr>
                            </table>
                            <br/>
                            <br/>
                            <a href="/myProfileEdit" style={{marginTop:"50px"}}><input type="button" value="??? ?????? ??????"/></a>
                        </div>
                    </div>
                </div>
            </div>
                :
            <div>

            </div>
            }
            
        </div>

    )

}

export default ProfileUser