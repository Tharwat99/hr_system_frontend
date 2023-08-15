import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { EditEmployeeModal } from './editModal';
import { DeleteUserModal } from './deleteModal';
import { AttendanceModal } from './attendanceModal';


export function EmployeesTable({employees, fetchEmployees}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Username</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Group</TableCell>
            <TableCell align="center">Action</TableCell>
            <TableCell align="center">Attendance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center">{employee.username}</TableCell>
              <TableCell align="center">{employee.email}</TableCell>
              <TableCell align="center">{employee.group}</TableCell>
              <TableCell align="center" sx={{display:"flex", justifyContent:"center"}}>
                <EditEmployeeModal employee={employee} fetchEmployees = {fetchEmployees}/>
                <DeleteUserModal employee={employee} fetchEmployees = {fetchEmployees}/>
              </TableCell>
              <TableCell align="center"><AttendanceModal employee={employee} fetchEmployees = {fetchEmployees}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}