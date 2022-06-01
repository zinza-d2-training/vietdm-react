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

export interface LoginResponse {
  success: boolean;
  data?: {
    token: string;
    user: UserInterface;
  };
  message?: string;
}

export interface Error401Interface {
  mgs: string;
  type?: string;
}

export function isError401(payload: unknown): payload is Error401Interface {
  return Object.prototype.hasOwnProperty.call(payload, 'mgs');
}

export interface PropAttributeInterface {
  input?: Partial<StandardInputProps>;
  helpText?: Partial<FormHelperTextProps>;
}
