
import { createContext, useEffect, useReducer } from "react";

export const AuthContext= createContext();

const authReducer=(state, action)=>{
    switch(action.type){
        case 'LOGIN':
            return {user:action.payload}
        case 'LOGOUT':
            return {user: null}
        case 'UPDATE_USER':
            return {user:action.payload}
        default:
            return state
    }
}

// eslint-disable-next-line react/prop-types
export const AuthContextProvider=({children})=>{
    const [state, dispatch]= useReducer(authReducer,{
        user:null, 
    })
    useEffect(()=>{
        const user= JSON.parse(localStorage.getItem('user'))
        if(user){
            dispatch({type:'LOGIN', payload:user})
        }
    },[])
    const updateUser = (updatedProfile) =>{
        console.log("updating user...")
        dispatch({type:'UPDATE_USER', payload:updatedProfile})
        localStorage.setItem('user', JSON.stringify(updatedProfile))
    }
    console.log('Authcontext State:', state)
    return(
        <AuthContext.Provider value={{...state, dispatch, updateUser}}>
            {children}
        </AuthContext.Provider>
    )
}