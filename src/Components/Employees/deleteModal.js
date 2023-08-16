import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import CircularProgress from '@mui/material/CircularProgress';
import { Snackbar } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 8,
};
const hrUser=JSON.parse(localStorage.getItem('hr_user'));

export  function DeleteUserModal({employee, fetchEmployees}) {
  // const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleDeleteUser = async () => {
    setLoading(true)
    try {
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/employee/details/${employee.username}`,  {
            headers: { Authorization: `Bearer ${hrUser.access}` },
        });
        fetchEmployees();
        handleClose();
    } catch (error) {
        setErrMsg('An error occurred while deleting employee.');
    }
    setLoading(false)
};

  return (
    <div>
      <Button color="error" onClick={handleOpen}><DeleteForeverTwoToneIcon color="error"/></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
      <div >Delete Confirmation</div>
      
      <div style={{margin:'20px 0'}}>
          <div className='py-3'>
          Are you Sure you want to delete this user? 
          </div>
      </div>
        <Button sx={{marginRight:"1rem"}}variant='contained' color='error' onClick={handleClose}>
            Cancel
        </Button>
        <Button variant='contained' type="button" disabled={loading} onClick={handleDeleteUser}>
            {loading ? <CircularProgress sx={{width:"25px !important", height:"25px !important", color:"#FFF"}}/> : "Confirm"}
        </Button>
        
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