import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const style = {
    position:"absolute",
    top:"20px",
    right:"25px",
}

const hrUser = JSON.parse(localStorage.getItem('hr_user'))
const LogoutButton = () => {
    const navigate = useNavigate();
    const handleLogout = () =>{
        localStorage.removeItem('hr_user');
        navigate('/login')
    };
    return (
        <div>
            {/* {hrUser['user']['username']} */}
            <Button color="error" variant='contained' sx = {style} onClick={handleLogout}>Logout</Button>
        </div>
    );
}

export {LogoutButton};
