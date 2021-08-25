import React,{useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import ScrollTop from '../TopBtn/ScrollTop'
import NavBar from '../NavBar/NavBar'
import NavBarUser from '../NavBar/NavBarUser'
import Weather from '../Modal/Weather'
import AdminNoticeBtn from '../AlarmBtn/AdminNoticeWrite'
import { VscBellDot } from "react-icons/vsc";
import {GrNotification} from "react-icons/gr"
import '../../../css/style.css'
import NoticeView from '../AlarmBtn/NoticeView'

function LandingPage(props){
    const [Seen, setSeen] = useState(false);
    const [Session,setSession] = useState("")
    const [AlertVar,setAlertVar] = useState(0)

    const onSeenHandler = () =>{
        setSeen(!Seen);
        axios.get('/api/clearNotice')
        .then(response=>{
            setAlertVar(0);
        })
    }

    useEffect(async ()=>{

        const worker = async () =>{
            await getSession();
            await setAlert();
            await DOMRendering();
        }

        const getSession = () =>{
            axios.get('/api/getSession')
            .then(response=>{
                setSession(response.data.ID);
            })
        }

        const setAlert = () =>{
            if (Session!='' && Session!=undefined && Session!='admin'){
                axios.get('/api/noticeView')
                .then(response=>{
                    setAlertVar(response.data.alertVar);
                })
            }
        }

        const landPageRendering = () =>{
            const result=[];
            if (Session){
                result.push(
                    <div>
                        
                        <div className="ContentContainer" id="ContentContainer">
                            
                        <a>{AlertVar ? <VscBellDot onClick={onSeenHandler} className='alarmNotice'/> : <GrNotification onClick={onSeenHandler} className='alarmNotice'/>}</a>
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
        
        const DOMRendering = () =>{
            ReactDOM.render(landPageRendering(),document.getElementById('divCon'));
        }
        worker();

    },[AlertVar,Session,Seen])

    


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