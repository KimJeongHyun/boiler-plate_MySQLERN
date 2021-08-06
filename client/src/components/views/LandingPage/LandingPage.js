import React,{useEffect, useState} from 'react'
import {useHistory,useLocation} from 'react-router-dom'
import axios from 'axios'
import ScrollTop from '../TopBtn/ScrollTop'
import NavBar from '../NavBar/NavBar'
import NavBarUser from '../NavBar/NavBarUser'
import '../../../css/style.css'

function LandingPage(props){

    const [Session,setSession] = useState("")

    useEffect(()=>{
        axios.get('/api/getSession')
        .then(response=>{
            setSession(response.data.isAuth);
        })
    },[])

    
    return(
        <div>
            {Session ? <NavBarUser/> : <NavBar/>}
            <div className="ContentContainer">
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
        </div>
    )
}

export default LandingPage