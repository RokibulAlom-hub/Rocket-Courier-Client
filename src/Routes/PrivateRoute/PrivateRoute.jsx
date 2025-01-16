import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user,loading} = useAuth();
    const navigate = useNavigate()
    if (loading) {
        return <span className="loading loading-ball loading-lg"></span>
    }
    if(user){
        return children
    }
   else{
    navigate('/login')
   }
};

export default PrivateRoute;