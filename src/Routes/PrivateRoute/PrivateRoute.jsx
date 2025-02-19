import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Pages/Sharedcomponensts/Loading';

const PrivateRoute = ({children}) => {
    const {user,loading} = useAuth();
    const navigate = useNavigate()
    if (loading) {
        return <Loading></Loading>
    }
    if(user){
        return children
    }
   else{
    navigate('/login')
   }
};

export default PrivateRoute;