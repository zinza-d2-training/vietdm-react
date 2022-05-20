import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../../Services/AuthService';

export default function Logout() {
  AuthService.logout();
  return <Navigate to="/auth/login" />;
}
