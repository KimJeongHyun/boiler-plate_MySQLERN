import React,{useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
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
            setSession(response.data.ID);
        })

        const landPageRendering = () =>{
            const result=[];
            if (Session){
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
        <div id="divCon">
            
        </div>
    )
}

export default LandingPage