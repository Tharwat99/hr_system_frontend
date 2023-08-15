import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigateTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate email address
    if (!email.includes('@')) {
        alert('Please enter a valid email address');
        return;
      }
  
      // Validate password
      if (password.length < 6) {
        alert('Please enter a password that is at least 6 characters long');
        return;
      }
  
    try {
        const response = await axios.post('http://127.0.0.1:80/employee/login/', {
          email,
          password,
        });
        console.log(response.data); // Handle the successful login response
        localStorage.setItem('hr_user', JSON.stringify(response.data))
        navigateTo('/')
      } catch (error) {
        console.error(error.response.data); // Handle login error
      }
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default Login;