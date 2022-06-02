import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { PropAttributeInterface } from '../../Types';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import * as yup from 'yup';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { sleep } from '../../Common';

interface FormValues {
  email: string;
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
    required: 'Địa chỉ email không được trống',
    pattern: 'Địa chỉ email không đúng định dạng'
  }
};

const schemaValidate = yup.object({
  email: yup.string().email(MgsValidate.email.pattern).required(MgsValidate.email.required)
});

const FormForgot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
`;

function ForgotPassword() {
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitted }
  } = useForm<FormValues>({
    resolver: yupResolver(schemaValidate)
  });

  const navigate = useNavigate();
  const [requesting, setRequesting] = useState<boolean>(false);

  const onSubmit = async (param: FormValues) => {
    setRequesting(true);
    await sleep(2000);
    navigate('/auth/login');
  };

  return (
    <FormForgot>
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
            <Typography
              variant="h6"
              component="p"
              sx={{
                textAlign: 'center',
                fontSize: '18px'
              }}>
              Để khôi phục mật khẩu, vui lòng nhập đúng email bạn đã dùng để đăng ký
              <Box component="span" sx={{ color: 'red', ml: 1 }}>
                (*)
              </Box>
            </Typography>
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

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 1
              }}>
              <LoadingButton
                disabled={requesting}
                loading={false}
                variant="outlined"
                color="info"
                sx={{
                  marginRight: '2px',
                  mb: 0
                }}>
                Quay lại
              </LoadingButton>
              <LoadingButton
                type="submit"
                loading={requesting}
                disabled={requesting || (isSubmitted && !isValid)}
                variant="contained"
                color="primary"
                sx={{
                  marginLeft: '2px',
                  mb: 0
                }}>
                Gửi
              </LoadingButton>
            </Box>
          </form>
        </Box>
      </Box>
    </FormForgot>
  );
}

export default ForgotPassword;
