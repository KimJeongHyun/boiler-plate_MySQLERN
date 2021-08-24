import React,{useEffect, useState} from 'react'
import axios from 'axios'

function AdminNoticeWrite(props){

    const [Content,setContent] = useState("")

    const onContentHandler = (event) =>{
        setContent(event.currentTarget.value)
    }
    const handleClick = () =>{
        props.toggle();
    }

    const onSubmitHandler = (event) =>{
        event.preventDefault();
    
        let body={
            Content:Content
        }
        axios.post('/api/notice',body)
        .then(response=>{
            console.log(response);
        });
        props.toggle();
        
    }
    return(
        <div className="alarmBtnContainer">
        <div className="alarmBtnContent">
            <span className="close" onClick={handleClick}>
                &times;
            </span>
            <h3>공지사항 작성</h3>
            <form onSubmit={onSubmitHandler}>
                <input type="text" style={{width:'80%'}} onChange={onContentHandler}/>
                <button>작성</button>
            </form>
            <button onClick={handleClick}>닫기</button>
        </div>
      </div>
    )
}

export default AdminNoticeWrite



