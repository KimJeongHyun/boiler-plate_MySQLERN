import React,{useState} from 'react'
import {useLocation} from "react-router";
import ScrollTop from '../TopBtn/ScrollTop'
import NavBar from '../NavBar/NavBar'
import NavBarUser from '../NavBar/NavBarUser'
import '../../../css/style.css'
import {useDispatch} from 'react-redux'
import {boardView} from '../../../_actions/user_action'
import { RiContactsBookUploadLine } from 'react-icons/ri';

function Board(props){
    const [Title, setTitle] = useState("")
    const [Rows, setRows] = useState("")
    const [Pagenum, setPagenum] = useState("")
    const [Page, setPage] = useState("")
    const [Length, setLength] = useState("")
    const [Lastidx, setLastidx] = useState("")
    const [Session,setSession] = useState("")

    const dispatch = useDispatch();
    dispatch(boardView())
        .then(response=>{
            const result = response.payload;
            setTitle(result.title);
            setRows(result.rows);
            setPagenum(result.page_num);
            setPage(result.page);
            setLength(result.length);
            setLastidx(result.lastidx);
            setSession(result.userName);
        })
    
    const sessionValue = (Session) =>{
        if (typeof Session!=='undefined' || Session==''){
            return true;
        }else{
            return false;
        }
    }
    const postRendering = () =>{
        const result=[];
        for (let i=0; i<Rows.length; i++){
            result.push(<tr key={i}>
                            <td>
                                {Rows[i].idx}
                            </td>
                            <td>
                                {Rows[i].title}
                            </td>
                            <td>
                                {Rows[i].nick}
                            </td>
                        </tr>)
        }
        return result;
    }

    const footerRendering = () =>{
        const result=[];
        for (let i=0; i<Length/Pagenum; i++){
            const urlParam = i+1;
            result.push(
                <span key={i}>
                    [<a href={"/board/list/"+urlParam}>{i+1}</a>]
                </span>
            )
        }
        return result;
    }

    return(
        <div>
            {sessionValue(Session) ? <NavBarUser/> : <NavBar/>}
                <div className= "ContentContainer" id="ContentContainer" style={{top:"50px"}}>
                    <div className="ContentField" style={{textAlign:"center"}}>
                        <h1>{Title}</h1>
                        <table style={{margin:"auto", width:"50%"}}>
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th>제목</th>
                                    <th>글쓴이</th>
                                </tr>
                            </thead>
                            {
                                    <tbody>
                                        {postRendering()}
                                    </tbody>
                                
                            }
                            
                            <tfoot>
                            <tr>
                                <td colSpan="3" style={{paddingTop:"30px"}}>
                                    {footerRendering()}
                                </td>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <ScrollTop/>
            </div>
    )
    
}

export default Board
