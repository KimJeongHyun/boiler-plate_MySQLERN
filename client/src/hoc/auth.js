import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {auth} from '../_actions/user_action'

export default function (SpecificComponent, option, adminRoute = null){

    function AuthenticationCheck(props){
        const dispatch = useDispatch();
        useEffect(()=>{
            dispatch(auth())
            .then(response=>{
                if (response.payload.isAuth){
                    if (option==false){
                        props.history.push('/authError');
                    }
                }else{
                    if (option==true && SpecificComponent.name!=='Logout'){
                        props.history.push('/authError');
                    }
                }
            })
        },[])

        return <SpecificComponent idx={props.match.params.idx} filter={props.match.params.filter} text={props.match.params.text} name={props.match.params.name}/>
    }
    return AuthenticationCheck
}