import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import { Redirect } from 'react-router-dom';
import {postWrite} from '../../../_actions/user_action'


function PostWrite(props){
    const dispatch = useDispatch();

    const [Title,setTitle] = useState("")
    const [Content,setContent] = useState("")

    const onTitleHandler = (event) =>{
        setTitle(event.currentTarget.value);
    }

    const onContentHandler = (event) =>{
        setContent(event.currentTarget.value);
    }

    const onSubmitHandler = (event) =>{
        event.preventDefault();
        let body={
            Title:Title,
            Content:Content
        }
        dispatch(postWrite(props.match.params.idx,body))
        .then(response=>{
            if (response.payload.writeSuccess){
                props.history.push({
                    pathname:"/board/list/1"
                });
            }else{
                alert('Error');
            }
        })
    }

    return(
        <div>
            <div className= "ContentContainer" id="ContentContainer">
                <div className="ContentField">
                    <form onSubmit={onSubmitHandler}>
                        <table style={{width:"80vw", height:"80vh", paddingLeft:"50px"}}>
                            <tr>
                                <td colSpan="2" style={{height:"10%", paddingTop:"3vh"}}>
                                    <input style={{border:"none", width:"100%", fontSize:"2em", fontWeight:"bold"}} type="text" value={Title} placeholder="제목을 작성해주세요!" onChange={onTitleHandler} required /> 
                                </td>
                            </tr>
                            <tr>
                            {/*<td>
                                <input type="button" id = "<%=id%>" value="파일 업로드" onClick="openChild(this)"/>
                                <span id="sInput" style={{fontSize:"12px"}}></span><a href="/uploadedFileDelete/<%=id%>"><input type="button" tyle="margin-left:20px" value="업로드 취소" onClick="deleteFile()"/></a>
                            </td>*/}
                            </tr>
                            <tr>
                            <td colSpan="2" style={{paddingTop:"20px"}}>
                                <textarea style={{border:"none", width:"100%", height:"100%", paddingTop:"20px", fontSize:"1.3em"}} value={Content} placeholder="내용을 작성해주세요!" onChange={onContentHandler} required ></textarea>
                            </td>
                            </tr>
                            <tr>
                            <td colSpan="2" style={{textAlign:"right"}}>
                                <button>글 쓰기</button>
                            </td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostWrite