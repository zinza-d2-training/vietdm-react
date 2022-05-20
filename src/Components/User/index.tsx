import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../Store/HookStore';
import { hideLoading, showLoading } from '../../Store/Slice/LoadingSlice';
import AuthService from '../../Services/AuthService';
import { setLogin } from '../../Store/Slice/UserSlice';
import { UserInterface } from '../../Types';
import { Navigate } from 'react-router-dom';
import Info from './Info';

function User() {
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(showLoading());
    AuthService.getInfo()
      .then((result) => {
        dispatch(setLogin(result as UserInterface));
      })
      .catch(() => {
        setRedirectToLogin(true);
      })
      .finally(() => {
        dispatch(hideLoading());
      });
  }, []);

  if (redirectToLogin) {
    return <Navigate to={'/auth/login'} />;
  }

  return <Info />;
}
export default User;
