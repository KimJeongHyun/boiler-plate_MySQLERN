import React,{useEffect, useState} from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'

function NoticeView(props){

    const [Content,setContent] = useState("")
    const [Rows,setRows] = useState("")
    const [Length,setLength] = useState("")
    const onContentHandler = (event) =>{
        setContent(event.currentTarget.value)
    }

    const handleClick = () =>{
        props.toggle();
    }

    const worker = async () =>{
        if (Length==0){
            const emptyRendering = () =>{
                return(
                    <>
                        공지사항이 없습니다.
                        <br/>
                    </>
                )
            }
            ReactDOM.render(emptyRendering(),document.getElementsByClassName('noticeContent')[0])
        }else{
            const contentRendering = () =>{
                const result = [];
                for (let i = 0; i<Length; i++){
                    result.push(
                        <>
                            {Rows[i].content}
                            <hr/>
                        </>
                    )
                }
                return result;
            }
            ReactDOM.render(contentRendering(),document.getElementsByClassName('noticeContent')[0])
        }
    }

    useEffect(async()=>{
        await axios.get('/api/noticeView')
        .then(response=>{
            setRows(response.data.rows);
            setLength(response.data.length);
        });
        await worker();
        
    },[Length])

    
    return(
        <div className="alarmBtnContainer">
        <div className="alarmBtnContent">
            <span className="close" onClick={handleClick}>
                &times;
            </span>
            <h3>공지사항</h3>
            <div className="noticeContent">

            </div>
            <br/>
            <button onClick={handleClick}>닫기</button>
        </div>
      </div>
    )
}

export default NoticeView



