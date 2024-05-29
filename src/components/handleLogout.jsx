import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const handleLogout = () => {
    const navigate = useNavigate();
    
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/');
      };


export default handleLogout
