import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField, Typography, Link, Alert } from '@mui/material';
import { Box } from '@mui/system';
import { Error401Interface, LoginParam, PropAttributeInterface } from '../../Types';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { login } from '../../Services/AuthService';
import { useAppDispatch } from '../../Store/HookStore';
import { setLogin } from '../../Store/Slice/UserSlice';
import * as yup from 'yup';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';

interface FormValues {
  email: string;
  password: string;
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

const MgsValidate = {
  email: {
    required: 'Địa chỉ email là bắt buộc',
    pattern: 'Địa chỉ email không đúng định dạng'
  },
  password: {
    required: 'Mật khẩu không được trống',
    min: 'Mật khẩu phải chứa ít nhất ${min} ký tự',
    pattern: 'Mật khẩu không được chứa dấu khoảng trắng'
  }
};

const schemaValidate = yup.object({
  email: yup.string().email(MgsValidate.email.pattern).required(MgsValidate.email.required),
  password: yup
    .string()
    .min(8, MgsValidate.password.min)
    .matches(/^[^ ]*$/i, MgsValidate.password.pattern)
    .required(MgsValidate.password.required)
});

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
    formState: { isValid, isSubmitted }
  } = useForm<FormValues>({
    resolver: yupResolver(schemaValidate)
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [requesting, setRequesting] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const onSubmit = async (param: FormValues) => {
    setRequesting(true);
    const paramLogin: LoginParam = { ...param };

    const response = await login(paramLogin);
    if (response.success && !!response.data) {
      setRequesting(false);
      dispatch(setLogin(response.data.user));
      navigate('/user');
    } else {
      setRequesting(false);
      setLoginError(response.message || '');
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
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  fullWidth
                  autoFocus
                  size="small"
                  margin="dense"
                  InputProps={propsAttribute.input}
                  FormHelperTextProps={propsAttribute.helpText}
                  label="Email (*)"
                  error={!!error}
                  helperText={error?.message}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  fullWidth
                  size="small"
                  margin="dense"
                  type="password"
                  InputProps={propsAttribute.input}
                  FormHelperTextProps={propsAttribute.helpText}
                  label="Password (*)"
                  error={!!error}
                  helperText={error?.message}
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
            {!!loginError && (
              <Alert icon={false} severity="error">
                {loginError}
              </Alert>
            )}
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
