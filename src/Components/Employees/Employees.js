import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import { EmployeesTable } from './employeesTable';
import { AddEmployeeModal } from './addModal';
import { LogoutButton } from '../Auth/Logout';

const Employees = () => {
  const hrUser = JSON.parse(localStorage.getItem('hr_user'))
  const [employees, setEmployees] = useState([]);
  const navigateTo = useNavigate();
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/employee/list-create/`, {
        headers: { Authorization: `Bearer ${hrUser?.access}` },
      });
      setEmployees(response.data);
      
    } catch (error) {
        if (error.response.status === 401){
            localStorage.removeItem('hr_user')
            navigateTo('/login')
        }
      console.error('Failed to fetch employees', error);
    }
  };
  return (
    
    <div>
      <LogoutButton/>
      <div style={{display:"flex", alignItems:"center", padding:"1rem"}}>
        <h2 style={{marginRight:"8px"}}>Employees</h2>
        <AddEmployeeModal fetchEmployees = {fetchEmployees}/>
      </div>
      <EmployeesTable employees= {employees} fetchEmployees = {fetchEmployees}/>
    </div>
    
  );
};
export default Employees;