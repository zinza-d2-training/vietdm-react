import { LoginParam } from '../Types';
import axios from '../Api';

const API_URL = 'http://localhost:8080/api/';

const AuthService = {
  login: (param: LoginParam) => {
    return new Promise((resolve, reject) => {
      axios
        .post(API_URL + 'login', param)
        .then((result) => {
          const token = result.data.token;
          localStorage.setItem('access_token', token);
          return resolve(true);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            return reject(err.response.data.mgs);
          }
          return reject('An unknown error!');
        });
    });
  },
  getInfo: () => {
    const token = localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
      axios
        .post(API_URL + 'user/info', { token })
        .then((result) => {
          return resolve(result.data.users);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            if (['expire', 'not_found'].indexOf(err.response.data.type) != -1) {
              localStorage.removeItem('access_token');
            }
            return reject(err.response.data.mgs);
          }
          return reject('An unknown error!');
        });
    });
  },
  logout: () => {
    localStorage.removeItem('access_token');
  }
};

export default AuthService;
