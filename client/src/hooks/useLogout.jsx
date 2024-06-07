import { useAuthContext } from "./UseAuthContext";

export const useLogout=()=>{
    const {dispatch} = useAuthContext();
    const logout =()=>{
        //remove user from storage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    
        //dispatch logout function
        dispatch({type: 'LOGOUT'})
    }
    return {logout}
}
