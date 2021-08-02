import React, {useEffect} from 'react'
import { BiChalkboard, BiHomeHeart, BiMenuAltLeft, BiSupport, BiClipboard } from "react-icons/bi";
import { DiReact } from "react-icons/di";
import { RiLoginCircleFill, RiUserAddLine } from "react-icons/ri";

export function NavBar(){
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
                        <a href="/info"><BiHomeHeart/><span id='linkName'>Home</span></a>
                        <span id='tooltip'>Home</span>
                    </li>
                    <li className="sideBar-item">
                        <a href="#"><BiChalkboard/><span id='linkName'>Notice</span></a>
                        <span id='tooltip'>Notice</span>
                    </li>
                    <li className="sideBar-item">
                        <a href="/board/list"><BiClipboard/><span id='linkName'>Board</span></a>
                        <span id='tooltip'>Board</span>
                    </li>
                    <li className="sideBar-item">
                        <a href="#"><BiSupport/><span id='linkName'>Support</span></a>
                        <span id='tooltip'>Support</span>
                    </li>
                    <div className="guestContainer">
                        <div className="guestContent" id="guestContent">
                            <a href="/login" id="functionName"><span id='linkName'>Login</span><RiLoginCircleFill id='linkBtn'/></a>
                            <br/>
                            <a href="/register" id="functionName"><span id='linkName'>Register</span><RiUserAddLine id='linkBtn'/></a>
                        </div> 
                    </div>         
                </ul>
            </nav>
         </div>
    )
    
}

export default NavBar;
