// src/components/ProtectedRoute.js
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import {useAuthContext} from "@/hooks/UseAuthContext.jsx";
import { Route, Routes } from 'react-router-dom'
import {useEffect} from "react";

const ProtectedRoute = ({ children }) => {
    // const {user} = useAuthContext()
    // const Navigate = useNavigate()
    const user = localStorage.getItem('token')
    let location = useLocation()
    if(!user){
        return <Navigate to='/auth/login' state={{from: location}} replace />
    }
    return children
    //
    // useEffect(() => {
    //     if(!user){
    //         Navigate('/auth/login')
    //     }
    // }, [user]);
    //
    // return (
    //     <Routes>
    //         <Route
    //             {...rest}
    //             render={props =>{
    //                 return (user!=null) ? (
    //                     <Component {...props} />
    //                 ) : (
    //                     Navigate('/auth/login')
    //                 )
    //             }}
    //         />
    //     </Routes>
    // );

};

export default ProtectedRoute;
