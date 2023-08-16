
import React, { useEffect, useState }  from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { CircularProgress, TextField } from '@mui/material';
import { Snackbar } from '@mui/material';

const style = {
    position: 'absolute',
    top: '10vh',
    left: '50%',
    transform: 'translate(-50%, 0)',
    minWidth: 400,
    overflow: 'auto',
    bgcolor: '#fff',
    boxShadow: 24,
    borderRadius: '15px',
    p:4,
    outline:0
  
  };

const hrUser = JSON.parse(localStorage.getItem('hr_user'))  
export function EditEmployeeModal({employee, fetchEmployees}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [employeeToBeEdited, setEmployeeToBeEdited] = useState({...employee});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (open){
        setEmployeeToBeEdited({...employee})
    }   
  }, [open]);
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
        const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/employee/details/${employee.username}`, 
        employeeToBeEdited, {
          headers: { Authorization: `Bearer ${hrUser.access}` },
        });
        fetchEmployees();
        handleClose();
      }
      catch (error) {
        if (error.response.status === 400){
          let error_msg = '';
          for (let key in error.response.data) {
            if (error.response.data.hasOwnProperty(key)) {
              error_msg += key + ":";
              error_msg += error.response.data[key][0]
            }
          }
          setErrMsg(error_msg);
        }else{
          setErrMsg('An error occurred while editing employee.');
        }
        
    }
    setLoading(false)
  }
  return (
    <div>
      <Button onClick={handleOpen}><EditTwoToneIcon/></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <h2 style={{marginTop:'0'}}>Update Employee</h2>
        <form onSubmit={(e)=>handleSubmit(e)} style={{display: 'flex', flexWrap:'wrap' }}>    
            <TextField size = "small"  id="email" label="Email" variant="outlined" value={employeeToBeEdited.email||''} onChange={(e)=>{
                setEmployeeToBeEdited(prev => ({...prev, email:e.target.value}))
            }} sx={{width:"100%", margin:"8px 0"}}/>
            
            <TextField size = "small"  id="username" label="Username" variant="outlined" value={employeeToBeEdited.username||''} onChange={(e)=>{
                setEmployeeToBeEdited(prev => ({...prev, username:e.target.value}))
            }} sx={{width:"100%", margin:"8px 0"}}/>
            <Button variant="contained" type = 'submit' sx={{marginRight:"1rem"}} disabled={loading}>
              {loading ? <CircularProgress sx={{width:"25px !important", height:"25px !important", color:"#FFF"}}/> : "Save"}
            </Button>
            <Button variant="contained" color = "error" onClick={handleClose}>Cancel</Button>
        </form>
        </Box>
      </Modal>
      <Snackbar
        open={!!errMsg}
        autoHideDuration={3000}
        onClose={() => {setErrMsg("")}}
        message={errMsg}
      />
    </div>
  );
}