import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Stack
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Box } from '@mui/system';
import { PropAttributeInterface } from '../../Types';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { sleep } from '../../Common';
import { DatePicker, LoadingButton, LocalizationProvider } from '@mui/lab';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import viLocale from 'date-fns/locale/vi';

const enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

interface FormValues {
  cccd_number: string;
  email: string;
  password: string;
  fullname: string;
  birthday: string;
  gender: Gender;
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
  cccd_number: {
    required: 'Số CMND/CCCD là bắt buộc',
    pattern: 'Số CMND/CCCD phải có 9 hoặc 12 chữ số'
  },
  email: {
    required: 'Địa chỉ email là bắt buộc',
    pattern: 'Địa chỉ email không đúng định dạng'
  },
  password: {
    required: 'Mật khẩu không được trống',
    min: 'Mật khẩu phải chứa ít nhất ${min} ký tự',
    pattern: 'Mật khẩu không được chứa dấu khoảng trắng'
  },
  fullname: {
    required: 'Họ và tên không được trống'
  },
  birthday: {
    required: 'Hãy chọn ngày sinh'
  }
};

const schemaValidate = yup.object({
  cccd_number: yup
    .string()
    .required(MgsValidate.cccd_number.required)
    .matches(/^(\d{9}|\d{12})$/, MgsValidate.cccd_number.pattern),
  email: yup.string().email(MgsValidate.email.pattern).required(MgsValidate.email.required),
  password: yup
    .string()
    .min(8, MgsValidate.password.min)
    .matches(/^[^ ]*$/i, MgsValidate.password.pattern)
    .required(MgsValidate.password.required),
  fullname: yup.string().required(MgsValidate.fullname.required),
  birthday: yup.string().required(MgsValidate.birthday.required)
});

function Register() {
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: yupResolver(schemaValidate),
    defaultValues: {
      cccd_number: '',
      email: '',
      password: '',
      fullname: '',
      birthday: '01/01/1990',
      gender: Gender.Male
    }
  });

  const navigate = useNavigate();
  const [requesting, setRequesting] = useState<boolean>(false);

  const onSubmit = async (param: FormValues) => {
    setRequesting(true);
    await sleep(2000);
    navigate('/auth/login');
  };

  return (
    <Stack justifyContent="center" alignItems="center" height="100%">
      <Box width="100%" padding="20px 0" maxHeight="100vh" overflow="hidden auto">
        <Box width="75%" maxWidth={450} m="auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h4" textAlign="center" fontWeight="bold" mb={2}>
              Đăng ký tài khoản
            </Typography>
            <Controller
              control={control}
              name="cccd_number"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  fullWidth
                  autoFocus
                  size="small"
                  margin="dense"
                  autoComplete="off"
                  InputProps={propsAttribute.input}
                  FormHelperTextProps={propsAttribute.helpText}
                  label="Số CMND/CCCD (*)"
                  error={!!error}
                  helperText={error?.message}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  fullWidth
                  size="small"
                  margin="dense"
                  autoComplete="off"
                  InputProps={propsAttribute.input}
                  FormHelperTextProps={propsAttribute.helpText}
                  label="Email (*)"
                  error={!!error}
                  helperText={error?.message}
                  {...field}
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
                  autoComplete="off"
                  InputProps={propsAttribute.input}
                  FormHelperTextProps={propsAttribute.helpText}
                  label="Mật khẩu (*)"
                  error={!!error}
                  helperText={error?.message}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="fullname"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  fullWidth
                  size="small"
                  margin="dense"
                  autoComplete="off"
                  InputProps={propsAttribute.input}
                  FormHelperTextProps={propsAttribute.helpText}
                  label="Họ và tên (*)"
                  error={!!error}
                  helperText={error?.message}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="birthday"
              render={({ field, fieldState: { error } }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={viLocale}>
                  <DatePicker
                    label="Birthday (*)"
                    value={field.value}
                    onChange={field.onChange}
                    disableFuture={true}
                    openTo="year"
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        size="small"
                        margin="dense"
                        autoComplete="off"
                        InputProps={propsAttribute.input}
                        FormHelperTextProps={propsAttribute.helpText}
                        error={!!error}
                        helperText={error?.message}
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
            />
            <Controller
              control={control}
              name="gender"
              render={({ field, fieldState: { error } }) => (
                <FormControl fullWidth error={!!error} size="small" sx={{ mt: 1, mb: 0.5 }}>
                  <InputLabel id="label_gender">Giới tính (*)</InputLabel>
                  <Select labelId="label_gender" id="gender" label="Giới tính (*)" {...field}>
                    <MenuItem value={Gender.Male}>Nam</MenuItem>
                    <MenuItem value={Gender.Female}>Nữ</MenuItem>
                    <MenuItem value={Gender.Other}>Khác</MenuItem>
                  </Select>
                  <FormHelperText>{error?.message}</FormHelperText>
                </FormControl>
              )}
            />
            <Box sx={{ textAlign: 'right' }}>
              <LoadingButton loading={requesting} variant="text" type="submit">
                <span>Tiếp tục</span>
                <ArrowForward />
              </LoadingButton>
            </Box>
          </form>
        </Box>
      </Box>
    </Stack>
  );
}

export default Register;
