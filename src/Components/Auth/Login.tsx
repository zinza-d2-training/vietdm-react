import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField, Typography, Link, Alert } from '@mui/material';
import { Box } from '@mui/system';
import { LoginParam, PropAttributeInterface } from '../../Types';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { login } from '../../Services/AuthService';
import { useAppDispatch } from '../../Store/HookStore';
import { setLogin } from '../../Store/Slice/UserSlice';
import styled from 'styled-components';

interface FormValues {
  email: string;
  password: string;
}

interface RuleInterface {
  email?: {
    required: boolean | string;
    pattern?: {
      value: RegExp;
      message: string;
    };
  };
  password?: {
    required: boolean | string;
    minLength?: {
      value: number;
      message: string;
    };
    pattern?: {
      value: RegExp;
      message: string;
    };
  };
}

const propsAttribute: PropAttributeInterface = {
  input: {
    style: {
      marginBottom: 0
    }
  },
  helpText: {
    style: {
      marginBottom: 0
    }
  }
};

const RuleValidate: RuleInterface = {
  email: {
    required: 'Địa chỉ email là bắt buộc',
    pattern: {
      value: /^[a-z\d._%+-]+@[a-z\d.-]+\.[a-z]{2,4}$/i,
      message: 'Địa chỉ email không đúng định dạng'
    }
  },
  password: {
    required: 'Mật khẩu không được trống',
    minLength: {
      value: 8,
      message: 'Mật khẩu phải chứa ít nhất 8 ký tự'
    },
    pattern: {
      value: /^[^ ]*$/i,
      message: 'Mật khẩu không được chứa dấu khoảng trắng'
    }
  }
};

const FormLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
`;

function Login() {
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid, isSubmitted }
  } = useForm<FormValues>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [requesting, setRequesting] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const onSubmit = async (param: FormValues) => {
    setRequesting(true);
    const paramLogin: LoginParam = { ...param };

    try {
      const { user } = await login(paramLogin);
      setRequesting(false);
      dispatch(setLogin(user));
      navigate('/user');
    } catch (err) {
      setRequesting(false);
      if (typeof err == 'string') {
        setLoginError(err);
      }
    }
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
    <FormLogin>
      <Box
        sx={{
          overflow: 'hidden auto',
          width: '100%',
          padding: '20px 0',
          maxHeight: '100vh'
        }}>
        <Box
          sx={{
            width: '75%',
            maxWidth: 450,
            margin: 'auto'
          }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h4">Đăng nhập vào tài khoản</Typography>
            {!!loginError && (
              <Alert icon={false} severity="error">
                {loginError}
              </Alert>
            )}
            <Controller
              control={control}
              name="email"
              rules={RuleValidate.email}
              render={({ field }) => (
                <TextField
                  fullWidth
                  autoFocus
                  size="small"
                  margin="dense"
                  InputProps={propsAttribute.input}
                  FormHelperTextProps={propsAttribute.helpText}
                  label="Email (*)"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={RuleValidate.password}
              render={({ field }) => (
                <TextField
                  fullWidth
                  size="small"
                  margin="dense"
                  type="password"
                  InputProps={propsAttribute.input}
                  FormHelperTextProps={propsAttribute.helpText}
                  label="Password (*)"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  onChange={field.onChange}
                />
              )}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1,
                mt: 1
              }}>
              <Link href="#">Quên mật khẩu?</Link>
              <LoadingButton
                type="submit"
                loading={requesting}
                disabled={requesting || (isSubmitted && !isValid)}
                variant="contained"
                color="success">
                Đăng nhập
              </LoadingButton>
            </Box>
          </form>
          <Box
            sx={{
              textAlign: 'center'
            }}>
            Hoặc đăng ký tài khoản nếu bạn chưa đăng ký!
          </Box>
          <Button
            fullWidth
            href="#"
            variant="outlined"
            color="success"
            sx={{
              mb: 0,
              mt: 1
            }}>
            Đăng ký
          </Button>
        </Box>
      </Box>
    </FormLogin>
  );
}

export default Login;
