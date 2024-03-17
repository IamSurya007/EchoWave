import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext=()=>{
    const context= useContext(AuthContext)

    if(!context){
        throw Error('useAuthCOntext must be used in authContextProvider')
    }
    return context
}