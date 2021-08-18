import React,{useEffect,useState} from 'react'
import { useHistory } from 'react-router'
import ReactDOM from 'react-dom'
import axios from 'axios'
import ScrollTop from '../TopBtn/ScrollTop'
import NavBar from '../NavBar/NavBar'
import NavBarUser from '../NavBar/NavBarUser'
import '../../../css/style.css'
import {useDispatch} from 'react-redux'
import {addComment,commentView,postView} from '../../../_actions/user_action'
import { withRouter ,Redirect } from 'react-router-dom';




function Post(props){
    const [Session,setSession] = useState("")
    const [ServerRes,setServerRes] = useState();
    const dispatch = useDispatch();
    
    const [Title, setTitle] = useState("")
    const [Rows, setRows] = useState("")
    const [Filename, setFilename] = useState("")
    const [Imgpaths, setImgpath] = useState("")
    const [Postloc, setPostloc] = useState("")

    const [Comment,setComment] = useState("")
    const [CommentRow, setCommentRow] = useState("")
    const history = useHistory()
    
    const onCommentHandler = (event) =>{
        setComment(event.currentTarget.value)
    }

    const onSubmitHandler = (event) =>{
        event.preventDefault();
        let body={
            content : Comment
        }
        dispatch(addComment(props.idx,body))
        .then(response=>{
            if (response.payload.commentSuccess){
                history.go(0)
            }else{
                alert('로그인을 해야 댓글을 작성할 수 있습니다.');
                history.go(0)
            }
        })
    }

    const filenameRendering = () => {
        const result=[];
        for (let i=0; i<Filename.length; i++){
            result.push(
                <td key={i} style={{height:"10%"}}><a href={"/fileDownload/"+props.idx+"/"+Filename[i]}>{Filename[i]}</a></td>
            )
        }
        return result;
    }
    const imgpathRendering = () =>{
        const result=[];

        for (let i=0; i<Imgpaths.length; i++){
            result.push(
                <td key={i} style={{height:"10%"}}><img src={"/"+Imgpaths[i]} id= 'imgs'  hidden/></td>
            )
        }
        return result; 
    }
    
    const commentRendering = () =>{
        const result = [];
        for (let i=0; i<CommentRow.length; i++){
            result.push(
                <div>
                    {CommentRow[i].author}
                    <br/>
                    {CommentRow[i].content}
                    <hr/>
                </div>
            )
        }
        return result;
    }

    const tablefootRendering = () =>{
        const result=[];
        if (Postloc === 'Guest'){
            result.push(
                <td colSpan={Filename.length} style={{textAlign:"right"}}>
                    <a href="/board/list/1"><input type="button" value="목록"/></a>
                </td>
            )
            
        }else if(Postloc === 'GuestNoRecom'){
            result.push(
                <td colSpan={Filename.length} style={{textAlign:"right"}}>
                    <a href="/board/list/1"><input type="button" value="목록"/></a>
                    <a href={"/recommend/"+Rows.idx}><input type="button" value="추천"/></a>
                </td>
            )
        }else if (Postloc === 'GuestRecom'){
            result.push(
                <td colSpan={Filename.length} style={{textAlign:"right"}}>
                    <a href="/board/list/1"><input type="button" value="목록"/></a>
                    <a href={"/recommendDel/"+Rows.idx}><input type="button" value="추천 해제"/></a>
                </td>
            )
        }else if (Postloc ==='PostUser'){
            result.push(
                <td colSpan={Filename.length} style={{textAlign:"right"}}>
                    <a href="/board/list/1"><input type="button" value="목록"/></a>
                    <a href={"/update/"+Rows.idx}><input type="button" value="글 수정"/></a>
                    <a href={"/delete/"+Rows.idx}><input type="button" value="글 삭제"/></a>
                </td>
            )
        }
        return result;   
    }

    
    useEffect(()=>{
        const strToHTML = (str) =>{
            const parser = new DOMParser();
            const doc = parser.parseFromString(str,'text/html')
            const element = doc.body.childNodes
            return element;
        }
        
        const imgShowClick = () =>{
            document.getElementById('imageHideBtn').removeAttribute('hidden');
            document.getElementById('imageShowBtn').setAttribute('hidden','');
            if (document.getElementById('imgs')!=undefined){
                document.getElementById('imgs').removeAttribute('hidden');
            }
        }
    
        const imgHideClick = () =>{
            document.getElementById('imageShowBtn').removeAttribute('hidden');
            document.getElementById('imageHideBtn').setAttribute('hidden','hidden');
            if (document.getElementById('imgs')!=undefined){
                document.getElementById('imgs').setAttribute('hidden','');
            }
        }
        
    
        axios.get('/api/getSession')
        .then(response=>{
            setSession(response.data.isAuth);
        })

        dispatch(postView(props.idx))
        .then(response=>{
            const result = response.payload;
            if (result.postElement){
                setTitle(result.title);
                setRows(result.rows);
                setFilename(result.fileName);
                setImgpath(result.imgPaths);
                setPostloc(result.postLoc);
                setServerRes(true);
            }else{
                setServerRes(false);
            }
        })

        dispatch(commentView(props.idx))
        .then(response=>{
            const result = response.payload;
            if (result.commentElement){
                setCommentRow(result.rows)
            }
        })

        const trueFunc =function trueFunc(){
            return(
            <div>
                <div>
                    {Session ? <NavBarUser/> : <NavBar/>}
                    <div className= "ContentContainer" id="ContentContainer">
                        <div className="ContentField">
                            <table style={{width:"80vw", height:"30vw",marginTop:"10px", marginLeft:"30px"}}>
                                <thead>
                                    <tr>
                                        <td colSpan="2" style={{height:"10%"}} ><h1><strong>{Rows.title}</strong></h1></td>
                                    </tr>
                                    <tr>
                                        <td>{Rows.nick} 조회수: {Rows.hit} 추천수: {Rows.recommend}</td>
                                    </tr>
                                    <tr>
                                        {filenameRendering()}
                                    </tr>
                                    <tr>
                                        {imgpathRendering()}
                                    </tr>
                                    <tr>
                                    <td>
                                        <input type="button" id="imageShowBtn" value="첨부된 이미지 보기" onClick={imgShowClick}/>
                                        <input type="button" id="imageHideBtn" value="이미지 닫기" onClick={imgHideClick} hidden/>
                                    </td>    
                                </tr>
                                </thead>
                                <tbody>
                                    <tr style={{height:"100%"}}>
                                        <td id='contentDiv' colSpan={Filename.length} style={{verticalAlign:"top", paddingTop:"20px"}}>
                                            
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td id="commentInputID">
                                            
                                        </td>
                                    </tr>
                                    <tr>
                                        <td id="commentID">

                                        </td>
                                    </tr>
                                    <tr>
                                        {tablefootRendering()}
                                    </tr>
                                </tfoot>
                            </table>
                            <div id="commentID">
                            </div>
                        </div>
                    </div>
                    <ScrollTop/>
                </div>
            </div>
            )
        }
        const falseFunc = function(){
            return(
                <div>
                    {alert('존재하지 않는 포스트입니다.',props.history.push('/board/list/1'))}
                </div>
            )
        }
        if (ServerRes==true){
            const totalRender = async() =>{
                await ReactDOM.render(trueFunc(),document.getElementById('Container'))
                for (let i=0; i<strToHTML(Rows.content).length; i++){
                    document.getElementById('contentDiv').append(strToHTML(Rows.content)[i])  
                }
            }
            totalRender()
        }else if (ServerRes==false){
            ReactDOM.render(falseFunc(),document.getElementById('Container'))
        }
        
    },[ServerRes])

    if (!(document.getElementById('commentInputID')==null)){
        const commentInputFunc = () => {
            const result = [];
            result.push(
                <form onSubmit={onSubmitHandler}>
                    <input type="text" value={Comment} onChange={onCommentHandler} style={{width:'95%',height:'30px',border:'1px solid grey'}} required></input>
                    <button type="submit" style={{width:'5%',height:'30px',backgroundColor:'black',color:'white',border:'none'}}>등록</button>
                </form>
            )
            return result;
        }
        ReactDOM.render(commentInputFunc(),document.getElementById('commentInputID'))
    }
    
    if (!(document.getElementById('commentID')==null)){
        ReactDOM.render(commentRendering(),document.getElementById('commentID'))
    }

    return(
        <div id="Container">
        </div>
    )
    
}

export default withRouter(React.memo(Post));


/*


<button >asdfasdfasdf</button>

<input type="text" value={Temp}></input>

*/
