import { InputProps as StandardInputProps } from '@mui/material/Input/Input';
import { FormHelperTextProps } from '@mui/material';

export interface LoginParam {
  email: string;
  password: string;
}

export interface UserInterface {
  id: number;
  hash: string;
  email: string;
  fullname: string;
  birthday: string;
  address: string;
}

export interface GetUserResponse {
  success: boolean;
  datas?: UserInterface;
  mgs?: string;
}

export interface Error401Interface {
  mgs: string;
  type?: string;
}

export interface PropAttributeInterface {
  input?: Partial<StandardInputProps>;
  helpText?: Partial<FormHelperTextProps>;
}
