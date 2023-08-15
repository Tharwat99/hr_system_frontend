
import React, { useContext } from 'react';
import { Navigate } from "react-router-dom";

const Authuser = ({ children }) => {
    const currentUser =JSON.parse(localStorage.getItem('hr_user'))||'';
    console.log(currentUser)
    if (currentUser) {
        return children
    } else {
        return <Navigate to="/login" />
    }

}

export  {Authuser};