// src/components/ProtectedRoute.js
import {useNavigate} from 'react-router-dom';
import {useAuthContext} from "@/hooks/UseAuthContext.jsx";
import { Route, Routes } from 'react-router-dom'
import {useEffect} from "react";

const ProtectedRoute = ({ component: Component, ...rest  }) => {
    const {user} = useAuthContext()
    const Navigate = useNavigate()

    useEffect(() => {
        if(user==null){
            Navigate("auth/login")
        }
    }, []);

    return (
        <Routes>
            <Route
                {...rest}
                render={props =>{
                    return (user!=null) ? (
                        <Component {...props} />
                    ) : (
                        Navigate('/auth/login')
                    )
                }}
            />
        </Routes>
    );
};

export default ProtectedRoute;
