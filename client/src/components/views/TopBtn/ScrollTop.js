import React,{useEffect, useState} from 'react'
import { BiArrowFromBottom } from "react-icons/bi";

export function ScrollTop(){

    const [scrollY, setScrollY] = useState(0);
    const [visible, setVisible] = useState(false);

    const handleScroll = () =>{
        setScrollY(window.pageYOffset);
        if (scrollY>100){
            setVisible(true);
        }else{
            setVisible(false);
        } 
    }

    const handleTop = () =>{
        window.scrollTo({
            top:0,
            behavior:'smooth'
        });
        setScrollY(0);
        setVisible(false);
    }

    useEffect(()=>{
        const watch = () =>{
            window.addEventListener('scroll',handleScroll);
        }
        watch();
        return () =>{
            window.removeEventListener('scroll',handleScroll);
        }
    })
    return (
        <div id='topDiv'>
            {visible && <i id='topBtn' onClick={handleTop}><BiArrowFromBottom/></i>}
        </div>
    )
}

export default ScrollTop;