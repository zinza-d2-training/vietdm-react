import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '@mui/material';
import AuthService from '../../Services/AuthService';
import { LoginParam } from '../../Types';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../../Store/Slice/LoadingSlice';
import { useAppDispatch } from '../../Store/HookStore';

type FormValues = {
  email: string;
  password: string;
};

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitted }
  } = useForm<FormValues>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [requesting, setRequesting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const onSubmit = async (param: FormValues) => {
    setRequesting(true);
    dispatch(showLoading());
    const dataLogin: LoginParam = {
      email: param.email,
      password: param.password
    };
    AuthService.login(dataLogin)
      .then(() => {
        setTimeout(() => navigate('/user'), 50);
      })
      .catch((err) => {
        setLoginError(err);
      })
      .finally(() => {
        setRequesting(false);
        dispatch(hideLoading());
      });
  };

  useEffect(() => {
    const subcription = watch(() => {
      setLoginError(null);
    });
    return () => {
      subcription.unsubscribe();
    };
  }, [watch]);

  return (
    <div className="register-form center-form">
      <div className="form-area">
        <div className="form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="form-header">Đăng nhập vào tài khoản</h2>
            <div className="form-group required">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Email"
                autoComplete="off"
                {...register('email', {
                  required: 'Địa chỉ email là bắt buộc',
                  pattern: {
                    value: /^[a-z\d._%+-]+@[a-z\d.-]+\.[a-z]{2,4}$/i,
                    message: 'Địa chỉ email không đúng định dạng'
                  }
                })}
              />
              <p className="error">{errors.email?.message}</p>
            </div>
            <div className="form-group required">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="*******"
                {...register('password', {
                  required: 'Mật khẩu không được trống',
                  minLength: {
                    value: 8,
                    message: 'Mật khẩu phải chứa ít nhất 8 ký tự'
                  },
                  pattern: {
                    value: /^[^ ]*$/i,
                    message: 'Mật khẩu không được chứa dấu khoảng trắng'
                  }
                })}
              />
              <p className="error">{errors.password?.message}</p>
            </div>
            <div className="row-forgot-password text-right mtb-3">
              <a href="#" className="text-decoration-none">
                Quên mật khẩu?
              </a>
            </div>
            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={requesting || (isSubmitted && !isValid)}
              className="w-100 montserrat-font">
              Đăng nhập
            </Button>
            <p className="error text-center">{loginError}</p>
          </form>
          <div className="row-guide-register mtb-3 text-center">
            Hoặc đăng ký tài khoản nếu bạn chưa đăng ký!
          </div>
          <Button variant="outlined" color="success" className="w-100">
            <a
              href=""
              className="w-100 text-decoration-none"
              onClick={(e) => {
                e.preventDefault();
                setRequesting(true);
              }}>
              Đăng ký
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
