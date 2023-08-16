import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';


export function AttendanceTable({attendances}) {
  console.log(attendances)
  const navigate = useNavigate()
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Present</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
        {attendances.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} align="center">No records found.</TableCell>
          </TableRow>
        ) : (
          attendances.map((attendance) => (
            <TableRow key={attendance.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center">{attendance.date}</TableCell>
              <TableCell align="center">{attendance.present?<CheckSharpIcon color = "info"/>:<CloseSharpIcon color="error"/>}</TableCell>
            </TableRow>
          )))
        }
        </TableBody>
      </Table>
    </TableContainer>
  );
}