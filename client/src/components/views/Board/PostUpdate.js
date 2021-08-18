import React, {useEffect,useState} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import ScrollTop from '../TopBtn/ScrollTop'
import PopUp from '../Modal/Modal'
import {fileUpload, postView,postUpdate} from '../../../_actions/user_action'
import NavBarUser from '../NavBar/NavBarUser'
import {withRouter} from 'react-router-dom';

function PostUpdate(props){
    const [Seen, setSeen] = useState(false);
    const [FileName, setFileName] = useState("");
    const onSeenHandler = () =>{
        setSeen(!Seen);
    }

    const onFileNameHandler = (event) =>{
        setFileName(event.currentTarget.value)
    }

    const dispatch = useDispatch();

    const [Title,setTitle] = useState("")
    const [DivContent,setDivContent] = useState(" ")
    const [Idx,setIdx] = useState("")
    const [File,setFile] = useState("")
    const [ServerRes, setServerRes] = useState()
    

    const onDivContentHandler = (event) =>{
        const divC = document.getElementById('contentDiv')
        const formData = new FormData();
        
        if (divC.getElementsByTagName('img').length>0){
            fetch(divC.getElementsByTagName('img')[0].currentSrc)
            .then(res=>res.blob())
            .then(blob=>{
                    blob.lastModifiedData = new Date()
                    blob.name = 'hello.'+blob.type.split('/')[1]
                    formData.append('img',blob,blob.name) // blob name 랜덤하게 주기.
                    //dispatch(fileUpload(props.idx,formData))
                }
            )
        }
        setDivContent(divC.innerHTML)
        //console.log(divC.getElementsByTagName('span')[0].innerText) setContent에서, 그냥 content에 태그 달린거 넣으면 안됨?
    }
    const onFileHandler = (event) =>{
        event.preventDefault();
        let file = event.target.files[0];
        setFile(file);
        setFileName(event.target.value.split('\\')[2])
    }

    const strToHTML = (str) =>{
        const parser = new DOMParser();
        const doc = parser.parseFromString(str,'text/html')
        const element = doc.body.childNodes
        return element;
    }

    const divContentRendering = () =>{
        if (document.getElementById('contentDiv')!=undefined){
            if (document.getElementById('contentDiv').childNodes.length<strToHTML(DivContent).length){
                for (let i=0; i<strToHTML(DivContent).length; i++){
                    document.getElementById('contentDiv').append(strToHTML(DivContent)[i])  
                }
            }
        }
    }

    const useTemp1 = async () =>{
        await useEffect(()=>{
                dispatch(postView(props.idx))
                .then(response=>{
                    const result = response.payload;
                    if (result.postElement){
                        setTitle(result.title);
                        setDivContent(result.rows.content);
                        setIdx(result.rows.idx);
                    }else{
                        setServerRes(false);
                    }
                })  
        },[])
    }

    const useTemp2 = async () =>{
        await divContentRendering()
    }

    const useWorker = async () =>{
        await useTemp1()
        await useTemp2()
    }

    useWorker();

    const onSubmitHandler = (event) =>{
        event.preventDefault();

        const formData = new FormData();
        formData.append('img',File);

        
        let body={
            Title:Title,
            Content:DivContent,
            Idx:Idx
        }
        dispatch(fileUpload(props.idx,formData))
        .then(response=>{
            dispatch(postUpdate(props.idx,body))
            .then(response=>{
                if (response.payload.updateSuccess){
                    setServerRes(true);
                    props.history.push({
                        pathname:"/board/list/1"
                    });
                }else{
                    setServerRes(false);
                    alert('Error!');
                    props.history.push({
                        pathname:"/board/list/1"
                    });
                }
            })
        })
    }

    useEffect(()=>{
        const onTitleHandler = (event) =>{
            setTitle(event.currentTarget.value);
        }
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
                                            <input type="text" value={FileName} onChange={onFileNameHandler}></input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" style={{paddingTop:"20px"}}>
                                            <div style={{border:"none", width:"100%", height:"500px",maxHeight:"500px", paddingTop:"20px", fontSize:"1.3em"}} id='contentDiv' onInput={onDivContentHandler} contentEditable='true'>
                                            
                                            </div>
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
            const totalRender = async() =>{
                await ReactDOM.render(trueFunc(),document.getElementById('Container'))
            }
            totalRender()
        }else if (ServerRes==false){
            ReactDOM.render(falseFunc(),document.getElementById('Container'));
        }
    },[ServerRes,Seen,Title,File,DivContent])

    return(
        <div id="Container">
        </div>
    )
}

export default withRouter(PostUpdate);