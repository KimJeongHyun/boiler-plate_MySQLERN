import React,{useEffect, useState} from 'react'

function Modal(props){
    const handleClick = () =>{
        props.toggle();
    }

    return(
        <div className="modal">
        <div className="modal_content">
            <span className="close" onClick={handleClick}>
                &times;
            </span>
            <h3>File Upload</h3>
            <input type="file" name="img" id="imgFile" accept=".gif, .jpg, .png" onChange={props.fileHandler}/>
            <br />
            <br />
            <button onClick={handleClick}>닫기</button>
        </div>
      </div>
        
    )
}

export default Modal;



