import {Navigate, useLocation} from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const user = localStorage.getItem('token')
    let location = useLocation()
    if (!user) {
        return <Navigate to='/auth/login' state={{from: location}} replace/>
    }
    return children

};

export default ProtectedRoute;
