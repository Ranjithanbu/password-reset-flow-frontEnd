import React, { useState } from 'react';
import CreateUser from './components/CreateUser'
import Home from './components/home';
import LoginPage from './components/LoginPage';
import { BrowserRouter, Link, Route, Router, Routes } from 'react-router-dom';
import ResetPage from './components/ResetPage';
import ResetPassword from './components/ResetPassword';


const App = () => {

  const [token, setToken] = useState('')
  console.log('from app', token);
  return (

    <div>

      <BrowserRouter>
        <Routes>

          <Route path='/' element={<CreateUser />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/resetPassword' element={<ResetPage token={token} setToken={setToken} />} />

          <Route path='/home' element={<Home />} />
          <Route path='/resetPasswordPage/:id/:token' element={<ResetPassword token={token} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
