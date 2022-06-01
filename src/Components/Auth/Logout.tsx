import React from 'react';
import { Navigate } from 'react-router-dom';
import { logout } from '../../Services/AuthService';
import { clearLogin } from '../../Store/Slice/UserSlice';
import { useAppDispatch } from '../../Store/HookStore';

export default function Logout() {
  const dispatch = useAppDispatch();

  logout();

  setTimeout(() => {
    dispatch(clearLogin(''));
  }, 10);

  return <Navigate to="/auth/login" />;
}
