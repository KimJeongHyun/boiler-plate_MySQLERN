import React, {useEffect,useState} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import ScrollTop from '../TopBtn/ScrollTop'
import PopUp from '../Modal/Modal'
import {postWrite, fileUpload} from '../../../_actions/user_action'
import NavBarUser from '../NavBar/NavBarUser'
import { withRouter } from 'react-router-dom';

function PostWrite(props){
    const [Seen, setSeen] = useState(false);
    const [FileName, setFileName] = useState("");
    
    const onSeenHandler = () =>{
        setSeen(!Seen);
    }


    const dispatch = useDispatch();

    const [Title,setTitle] = useState("")
    const [Content,setContent] = useState("")
    const [File,setFile] = useState("")
    const [ServerRes, setServerRes] = useState()
    const onTitleHandler = (event) =>{
        setTitle(event.currentTarget.value);
    }

    const onFileHandler = (event) =>{
        event.preventDefault();
        let file = event.target.files[0];
        setFile(file);
        setFileName(event.target.value.split('\\')[2])
    }

    const onContentHandler = (event) =>{
        setContent(event.currentTarget.value);
    }

    const onSubmitHandler = (event) =>{
        event.preventDefault();

        const formData = new FormData();
        formData.append('img',File);

        dispatch(fileUpload(props.idx,formData))
        .then(response=>{
            
        })
        let body={
            Title:Title,
            Content:Content
        }
        
        dispatch(postWrite(props.idx,body))
        .then(response=>{
            if (response.payload.writeSuccess){
                setServerRes(true);
                props.history.push({
                    pathname:"/board/list/1"
                });
            }else{
                setServerRes(false);
                alert('Error!');
            }
        })
        
    }

    useEffect(()=>{
        axios.get('/api/getSession')
        .then(response=>{
            setServerRes(response.data.isAuth);
        })
        
        const trueFunc = () =>{
            return (
                <div>
                    <NavBarUser/>
                    <div className= "ContentContainer" id="ContentContainer">
                        <div className="ContentField">
                            <form onSubmit={onSubmitHandler} encType="multipart/form-data">
                                <table style={{width:"80vw", height:"80vh", paddingLeft:"50px"}}>
                                    <tr>
                                        <td colSpan="2" style={{height:"10%", paddingTop:"3vh"}}>
                                            <input style={{border:"none", width:"100%", fontSize:"2em", fontWeight:"bold"}} type="text" value={Title} placeholder="제목을 작성해주세요!" onChange={onTitleHandler} required /> 
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input type="button" defaultValue="파일 업로드" onClick={onSeenHandler}/>
                                            {Seen ? <PopUp toggle={onSeenHandler} fileHandler={onFileHandler}/> : null}
                                            <input type="text" value={FileName}></input>
                                        </td>
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
                    <ScrollTop/>
                </div>
            )
        }

        const falseFunc = () =>{
            return(
                <div>
                    {alert('먼저 로그인하시기 바랍니다.')}
                </div>
            )
        }
        if (ServerRes==true){
            ReactDOM.render(trueFunc(),document.getElementById('Container'));
        }else if (ServerRes==false){
            ReactDOM.render(falseFunc(),document.getElementById('Container'));
        }
        console.log(File);
    },[ServerRes,Seen,Title,Content,File])

    return(
        <div id="Container">
        </div>
    )
}

export default withRouter(PostWrite);