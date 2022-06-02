import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../Store/HookStore';
import { setLogin } from '../../Store/Slice/UserSlice';
import { GetUserResponse, UserInterface } from '../../Types';
import { Navigate } from 'react-router-dom';
import Info from './Info';
import { getInfo } from '../../Services/AuthService';
import { RootState } from '../../Store';

function User() {
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state: RootState) => state.users.data);

  useEffect(() => {
    if (userData != null) {
      return;
    }

    const access_token = localStorage.getItem('access_token');
    if (access_token == null) {
      setRedirectToLogin(true);
      return;
    }

    (async () => {
      const response: GetUserResponse = await getInfo();
      if (!response.success) {
        setRedirectToLogin(true);
      } else {
        dispatch(setLogin(response.datas as UserInterface));
      }
    })();
  }, []);

  if (redirectToLogin) {
    return <Navigate to={'/auth/login'} />;
  }

  return <Info />;
}
export default User;
