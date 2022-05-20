import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Assets from '../../Assets';
import Login from './Login';
import Logout from './Logout';
import './Auth.scss';

function Auth() {
  return (
    <div id="AuthBox">
      <div
        className="AuthBox-left"
        style={{
          backgroundImage: 'url(' + Assets('bg_left_auth') + ')'
        }}></div>
      <div className="AuthBox-right">
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default Auth;
