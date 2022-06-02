import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Assets from '../../Assets';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import styled from 'styled-components';

const AuthBox = styled.div`
  display: flex;
  min-height: 100vh;
`;

const BoxLeft = styled.div`
  width: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${Assets('bg_left_auth')});
`;

const BoxRight = styled.div`
  width: 50%;
`;

export default function Auth() {
  return (
    <AuthBox>
      <BoxLeft />
      <BoxRight>
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BoxRight>
    </AuthBox>
  );
}
