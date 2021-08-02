import React,{useEffect, useState} from 'react'
import {useLocation} from "react-router";
import axios from 'axios'
import ScrollTop from '../TopBtn/ScrollTop'
import NavBar from '../NavBar/NavBar'
import '../../../css/style.css'

function LandingPage(props){
    const location = useLocation();
    const temp = location.state.Id;    

    useEffect(()=>{
        axios.get('/api/hello')
        .then(response=>{
            console.log(response.data)
        })
    },[])

    return(
        <div>
            <NavBar/>
            <div className="ContentContainer">
                <div className="ContentField">
                    <div style={{
                        display:'flex', flexDirection:'column',
                        width:'100%',height:'100vh'
                    }}>
                        <img src={"/imgs/freeimage1.jpg"}></img>
                        <br />
                        {/*temp*/}
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