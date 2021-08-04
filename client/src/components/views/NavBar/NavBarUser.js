import React, {useEffect} from 'react'
import { BiChalkboard, BiHomeHeart, BiMenuAltLeft, BiSupport, BiClipboard } from "react-icons/bi";
import { DiReact } from "react-icons/di";
import { RiLogoutCircleRFill  } from "react-icons/ri";

export function NavBarUser(){
    useEffect(()=>{
        let menuBtn = document.getElementById('menuBtn');
        let sideBar = document.getElementById('sideMenu');
        let bottomContent = document.getElementById('guestContent');
        let contentContainer = document.getElementsByClassName('ContentContainer');
        menuBtn.addEventListener('click',function(){
            sideBar.classList.toggle('active');
            bottomContent.classList.toggle('active');
            contentContainer[0].classList.toggle('active');
        })
    })

    return(
        <div>
            <nav> 
                <ul className="sideBar" id="sideMenu">
                    <li>
                        <DiReact id='logo'/>
                        <span id='titleName'>My PortFolio</span>
                        <BiMenuAltLeft id='menuBtn'/>
                    </li>
                    <li className="sideBar-item">
                        <a href="/"><BiHomeHeart/><span id='linkName'>Home</span></a>
                        <span id='tooltip'>Home</span>
                    </li>
                    <li className="sideBar-item">
                        <a href="#"><BiChalkboard/><span id='linkName'>Notice</span></a>
                        <span id='tooltip'>Notice</span>
                    </li>
                    <li className="sideBar-item">
                        <a href="/board/list/1"><BiClipboard/><span id='linkName'>Board</span></a>
                        <span id='tooltip'>Board</span>
                    </li>
                    <li className="sideBar-item">
                        <a href="#"><BiSupport/><span id='linkName'>Support</span></a>
                        <span id='tooltip'>Support</span>
                    </li>
                    <div className="guestContainer">
                        <div className="guestContent" id="guestContent">
                            <a href="/logout" id="functionName"><span id='linkName'>Logout</span><RiLogoutCircleRFill id='linkBtn'/></a>
                            <br/>
                        </div> 
                    </div>         
                </ul>
            </nav>
         </div>
    )
    
}

export default NavBarUser;
