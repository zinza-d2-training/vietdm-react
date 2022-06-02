import {
  LoginParam,
  GetUserResponse,
  LoginResponse,
  Error401Interface,
  isError401
} from '../Types';
import axios from '../Api';

const API_URL = 'http://localhost:8080/api/';
const HOME_URL = '/';

export async function login(param: LoginParam): Promise<LoginResponse> {
  try {
    const response = await axios.post(API_URL + 'login', param);
    const token = response.data.token;
    const user = response.data.user;
    localStorage.setItem('access_token', token);
    return {
      success: true,
      data: { token, user }
    };
  } catch (err) {
    if (
      !axios.isAxiosError(err) ||
      !err.response ||
      err.response.status != 401 ||
      !isError401(err.response.data)
    ) {
      return {
        success: false,
        message: 'No mgs'
      };
    }
    const data: Error401Interface = err.response.data;
    return {
      success: false,
      message: data.mgs
    };
  }
}

export async function getInfo(): Promise<GetUserResponse> {
  const token = localStorage.getItem('access_token');

  if (token == null) {
    return {
      success: false
    };
  }

  try {
    const response = await axios.post(API_URL + 'user/info', { token });
    return {
      success: true,
      datas: response.data.users
    };
  } catch (err) {
    if (
      !axios.isAxiosError(err) ||
      !err.response ||
      err.response.status != 401 ||
      !isError401(err.response.data)
    ) {
      return {
        success: false,
        mgs: 'No Mgs'
      };
    }
    const data: Error401Interface = err.response.data;
    if (['expire', 'not_found', 'token_error'].indexOf(data.type as string) != -1) {
      localStorage.removeItem('access_token');
    }
    return {
      success: false,
      mgs: data.mgs
    };
  }
}

export function logout() {
  localStorage.removeItem('access_token');
  location.href = HOME_URL;
}
