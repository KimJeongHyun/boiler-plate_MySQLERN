import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import { Redirect } from 'react-router-dom';
import {logout} from '../../../_actions/user_action'


function Logout(){
    const dispatch = useDispatch();
    dispatch(logout())
        .then(response=>{
            
        })
    return(
        <Redirect to ='/'/>
    )

}

export default Logout