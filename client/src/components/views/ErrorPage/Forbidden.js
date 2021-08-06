import React from 'react'

function Forbidden(){
 
    return(
        <div>
            <div style={{width:"100%",textAlign:'center',flexDirection:'column',margin:'auto'}}>
                <img src={"/imgs/lockIcon.png"} style={{width:"20%", minWidth:'300px'}}></img>
                <p>Oops! Please login first!</p>
                <a href='/'><button>Return to home</button></a>
            </div>
        </div>
    )

}

export default Forbidden