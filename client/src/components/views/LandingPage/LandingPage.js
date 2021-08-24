import React,{useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import ScrollTop from '../TopBtn/ScrollTop'
import NavBar from '../NavBar/NavBar'
import NavBarUser from '../NavBar/NavBarUser'
import Weather from '../Modal/Weather'
import AdminNoticeBtn from '../AlarmBtn/AdminNoticeWrite'
import {AiOutlineNotification} from "react-icons/ai"
import {GrNotification} from "react-icons/gr"

import '../../../css/style.css'
import NoticeView from '../AlarmBtn/NoticeView'

function LandingPage(props){
    const [Seen, setSeen] = useState(false);
    const [Session,setSession] = useState("")
    
    const onSeenHandler = () =>{
        setSeen(!Seen);
    }

    useEffect(()=>{
        axios.get('/api/getSession')
        .then(response=>{
            setSession(response.data.ID);
        })

        const landPageRendering = () =>{
            const result=[];
            if (Session){
                result.push(
                    <div>
                        
                        <div className="ContentContainer" id="ContentContainer">
                        <a><GrNotification onClick={onSeenHandler} className='alarmNotice'/></a>
                            <div className="ContentField">
                                <div style={{
                                    display:'flex', flexDirection:'column',
                                    width:'100%',height:'100vh'
                                }}>
                                    <img src={"/imgs/freeimage1.jpg"}></img>
                                    <br />
                                    <br />
                                    <img src={"/imgs/freeimage2.jpg"}></img>
                                    <ScrollTop/>
                                </div>
                            </div>
                        </div>
                        <NavBarUser/>
                    </div>
                )
            }else{
                result.push(
                    <div>
                        <div className="ContentContainer" id="ContentContainer">
                            <div className="ContentField">
                                <div style={{
                                    display:'flex', flexDirection:'column',
                                    width:'100%',height:'100vh'
                                }}>
                                    <img src={"/imgs/freeimage1.jpg"}></img>
                                    <br />
                                    <br />
                                    <img src={"/imgs/freeimage2.jpg"}></img>
                                    <ScrollTop/>
                                </div>
                            </div>
                        </div>
                        <NavBar/>
                    </div>
                )
            }
            return result;
        }
        ReactDOM.render(landPageRendering(),document.getElementById('divCon'));


    },[Session])

    


    return(
        <div>
            <div id="divCon">
                
            </div>
            {Session=='admin' ? (Seen ? <AdminNoticeBtn toggle={onSeenHandler}/> : null) : (Seen ? <NoticeView toggle={onSeenHandler}/>:null)}
            <Weather className='weatherCon'/>
        </div>
        
    )
}

export default LandingPage