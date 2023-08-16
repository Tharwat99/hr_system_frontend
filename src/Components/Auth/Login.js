// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigateTo = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Validate email address
//     if (!email.includes('@')) {
//         alert('Please enter a valid email address');
//         return;
//       }
  
//       // Validate password
//       if (password.length < 6) {
//         alert('Please enter a password that is at least 6 characters long');
//         return;
//       }
  
//     try {
//         const response = await axios.post('https://hrsystemtask.azurewebsites.net/employee/login/', {
//           email,
//           password,
//         });
//         console.log(response.data); // Handle the successful login response
//         localStorage.setItem('hr_user', JSON.stringify(response.data))
//         navigateTo('/')
//       } catch (error) {
//         console.error(error.response.data); // Handle login error
//       }
//   };
//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };
// export default Login;

import React, { useState } from 'react';
import { Button, CircularProgress, Snackbar, TextField } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const login_page_wrapper_style = {
    display: "flex",
    width: "100vw",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    overFlow:"hidden"
}

const login_card_wrapper_style = {
  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  borderRadius: "15px",
  padding: "20px",
  display: "flex",
  flexWrap: "wrap",
  minHeight: "300px",
  minWidth: "300px",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-around",
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigateTo = useNavigate();
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);
  
  
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
    setLoading(true)
    try {
      const response = await axios.post('https://hrsystemtask.azurewebsites.net/employee/login/', {email, password});
      if (response.status === 200 ) {
        localStorage.setItem('hr_user', JSON.stringify(response.data))
        navigateTo('/')
      } else {
        setErrMsg('Login failed.');
      }
    } catch (error) {
      setErrMsg('Login failed.', error);
    }
    setLoading(false)
      
  };

  return (
    <div style={login_page_wrapper_style}>
      <form onSubmit={handleSubmit} style = {login_card_wrapper_style}>
      <h2 style={{margin:"0"}}>SignIn</h2>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />
        <TextField
          value={password}
          type = 'password'
          onChange={(e) => setPassword(e.target.value)}
          id="outlined-basic"
          label="Password"
          variant="outlined"
        />
        <Button type="submit" variant="contained">
        {loading ? <CircularProgress sx={{width:"25px !important", height:"25px !important", color:"#FFF"}}/> : "Login"}
        </Button>                                                       
      </form>
      <Snackbar
      open={!!errMsg}
      autoHideDuration={6000}
      onClose={()=>{setErrMsg('')}}
      message={errMsg}
    />
    </div>
  );
};

export default Login;