import React, {useEffect,useState} from 'react'
import { BiChalkboard, BiHomeHeart, BiMenuAltLeft, BiSupport, BiClipboard } from "react-icons/bi";
import { DiReact } from "react-icons/di";
import { RiLogoutCircleRFill  } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import {AiOutlineNotification} from "react-icons/ai"
import NoticeWrite from '../Modal/AdminNoticeModal'


export function NavBarUser(){

    const [Seen, setSeen] = useState(false);
    const onSeenHandler = () =>{
        setSeen(!Seen);
    }

    const menuBtnOnClick = () =>{
        let menuBtn = document.getElementById('menuBtn');
        let sideBar = document.getElementById('sideMenu');
        let bottomContent = document.getElementById('guestContent');
        let contentContainer = document.getElementsByClassName('ContentContainer');
        sideBar.classList.toggle('active');
        bottomContent.classList.toggle('active');
        contentContainer[0].classList.toggle('active');
    }

    return(
        <div>
            <nav> 
                <ul className="sideBar" id="sideMenu">
                    <li>
                        <DiReact id='logo'/>
                        <span id='titleName'>My PortFolio</span>
                        <BiMenuAltLeft id='menuBtn' onClick={menuBtnOnClick}/>
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
                    <li className="sideBar-item">
                        <a onClick={onSeenHandler}><AiOutlineNotification/><span id='linkName'>Notice</span></a>
                        <span id='tooltip'>Notice</span>
                    </li>
                    <div className="guestContainer">
                        <div className="guestContent" id="guestContent">
                            <a href="/logout" id="functionName"><span id='linkName'>Logout</span><RiLogoutCircleRFill id='linkBtn'/></a>
                            <br/>
                            <a href="/myProfile" id="functionName"><span id='linkName'>Profile</span><FaRegUserCircle id='linkBtn'/></a>
                        </div> 
                    </div>         
                </ul>
                {Seen ? <NoticeWrite toggle={onSeenHandler}/> : null}
            </nav>
         </div>
    )
    
}

export default NavBarUser;
