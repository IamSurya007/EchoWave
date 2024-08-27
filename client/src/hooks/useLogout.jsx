import { useAuthContext } from "./UseAuthContext";
import {useNavigate} from "react-router-dom";


export const useLogout=()=>{
    const navigate = useNavigate()
    const {dispatch} = useAuthContext();
    const logout =()=>{
        //remove user from storage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    
        //dispatch logout function
        dispatch({type: 'LOGOUT'})
        navigate('/auth/login')
    }
    return {logout}
}
