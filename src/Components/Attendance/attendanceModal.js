
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import { Checkbox, CircularProgress, FormControlLabel, Snackbar, TextField } from '@mui/material';
import React, { useEffect, useState }  from 'react';
import axios from 'axios';

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
export function AttendanceModal({employee, fetchEmployees}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  
  const [attendance, setAttendace] = useState({
    'employee':employee.id,
    'date':new Date(),
    'present':true
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    if (open){
        setAttendace({
            'employee':employee.id,
            'date':new Date(),
            'present':false
          })
    }   
  }, [open]);
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
        const response = await axios.post('http://127.0.0.1:80/attendance/list-create/', attendance,{
        headers: { Authorization: `Bearer ${hrUser.access}` },
      });
        fetchEmployees();
        handleClose();
      } catch (error) {
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
          setErrMsg('An error occurred while adding attendance for employee.');
        }
        
    }
    setLoading(false)   
  }
  return (
    <div>
      <Button sx = {{fontSize:"0.75rem", color:"green"}}onClick={handleOpen}>Add Attendance <AddCircleTwoToneIcon sx = {{marginLeft:"0.5rem"}}/></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <h2 style={{marginTop:'0'}}>Add Attendance</h2>
        <form onSubmit={(e)=>handleSubmit(e)} style={{display: 'flex', flexWrap:'wrap' }}>    
            <div style ={{display:"flex", width:"100%", justifyContent:"space-between"}}>
                <TextField  size = "small"  id="date" label="date" type = "date" variant="outlined" value= {attendance.date} onChange={(e)=>{
                    setAttendace(prev => ({...prev, date:e.target.value}))
                }} sx={{width:"75%", margin:"8px 0"}}/>
                
                <FormControlLabel sx={{width:"20%"}} control={<Checkbox checked={attendance.present} onChange={(e)=>{
                    setAttendace(prev => ({...prev, present:e.target.checked}))
                }}/>} label="Present" />
            </div>
            <Button variant="contained" type = 'submit' disabled={loading}  sx={{marginRight:"1rem"}}>
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