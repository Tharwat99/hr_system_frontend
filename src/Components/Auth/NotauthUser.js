import React from 'react';
import { Navigate } from 'react-router-dom';

const NonAuthUser = ({children}) => {
    const currentUser = JSON.parse(localStorage.getItem('hr_user'))||'';
    if (!currentUser) {
        return children
    } else {
        return <Navigate to="/" />
    }
}

export  {NonAuthUser};