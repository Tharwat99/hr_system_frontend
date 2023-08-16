import React from 'react';
import {HashRouter, Route , Routes} from "react-router-dom";
import Login from './Components/Auth/Login';
import Employees from './Components/Employees/Employees';
import { Authuser } from './Components/Auth/authUser';
import { NonAuthUser } from './Components/Auth/NotauthUser';
import Attendance from './Components/Attendance/Attendance';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/login' element={<NonAuthUser><Login/></NonAuthUser>} />
        <Route path='/' element={<Authuser><Employees/></Authuser>} />
        <Route path='/attendance/:username' element={<Authuser><Attendance /></Authuser>} />
      </Routes>
    </HashRouter>
  );
}

export default App;