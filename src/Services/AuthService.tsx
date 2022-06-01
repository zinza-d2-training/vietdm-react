import { LoginParam, GetUserResponse, Error401Interface } from '../Types';
import axios from '../Api';
import { AxiosError } from 'axios';

const API_URL = 'http://localhost:8080/api/';

export async function login(param: LoginParam) {
  try {
    const response = await axios.post(API_URL + 'login', param);
    const token = response.data.token;
    const user = response.data.user;
    localStorage.setItem('access_token', token);
    return { token, user };
  } catch (error) {
    const err = error as AxiosError;
    if (!err.response) {
      throw err;
    }
    if (err.response.status == 401) {
      const data = err.response.data as Error401Interface;
      throw data.mgs;
    }
    throw err.response;
  }
}

export async function getInfo() {
  const token = localStorage.getItem('access_token');

  if (token == null) {
    return {
      success: false
    } as GetUserResponse;
  }

  try {
    const response = await axios.post(API_URL + 'user/info', { token });
    return {
      success: true,
      datas: response.data.users
    } as GetUserResponse;
  } catch (error) {
    const err = error as AxiosError;
    if (!err.response) {
      return {
        success: false
      } as GetUserResponse;
    }
    if (err.response.status == 401) {
      const data = err.response.data as Error401Interface;
      if (['expire', 'not_found', 'token_error'].indexOf(data.type as string) != -1) {
        localStorage.removeItem('access_token');
      }
      return {
        success: false,
        mgs: data.mgs
      } as GetUserResponse;
    }
    return {
      success: false
    } as GetUserResponse;
  }
}

export function logout() {
  localStorage.removeItem('access_token');
}
