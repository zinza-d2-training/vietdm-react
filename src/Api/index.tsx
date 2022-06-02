import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import DataUser from './users.json';
import { LoginParam, UserInterface } from '../Types';
import { sha256 } from 'crypto-hash';
import { parseJson, sleep } from '../Common';
import JWT from 'expo-jwt';
import { add } from 'date-fns';

const KeyJwt = '046cad5f129f2d2c780bd477cf548df3ebbf3a23';
const TimeExpireToken = {
  days: 2
};

const Mock = new MockAdapter(axios);
const API_URL = 'http://localhost:8080/api/';

const Response = {
  success: (data: unknown) => {
    return [200, data];
  },
  error401: (mgs: string | { type: string; mgs: string }) => {
    if (typeof mgs == 'string') {
      return [401, { mgs: mgs }];
    }
    return [401, mgs];
  }
};

Mock.onPost(API_URL + 'user/info').reply(async ({ data }) => {
  await sleep(1000);

  const param: { token: string } = parseJson(data);
  type jwtType = { expire: number; hash: string };
  let jwtData: jwtType = {
    expire: 0,
    hash: ''
  };
  try {
    jwtData = JWT.decode(param.token, KeyJwt) as jwtType;
  } catch (e) {
    return Response.error401({
      type: 'token_error',
      mgs: 'Token not found or error!'
    });
  }

  const date = new Date();

  if (date.getTime() > jwtData.expire) {
    return Response.error401({
      type: 'expire',
      mgs: 'Token has expire'
    });
  }

  const user = DataUser.find((user) => user.hash == jwtData.hash);
  if (user == undefined) {
    return Response.error401({
      type: 'not_found',
      mgs: 'User not found!'
    });
  }

  const responUser: UserInterface = {
    id: user.id,
    hash: user.hash,
    email: user.email,
    fullname: user.fullname,
    birthday: user.birthday,
    address: user.address
  };

  return Response.success({
    users: responUser
  });
});

Mock.onPost(API_URL + 'login').reply(async ({ data }) => {
  await sleep(1000);
  const dateNow = new Date();
  const date = add(dateNow, TimeExpireToken);

  const param: LoginParam = parseJson(data);
  const passwordHash = await sha256(param.password);
  const user = DataUser.find((item) => {
    return item.email == param.email && item.password == passwordHash;
  });

  if (user == undefined) {
    return Response.error401('Email or Password not correct!');
  }

  const token = JWT.encode(
    {
      hash: user.hash,
      expire: date.getTime()
    },
    KeyJwt
  );
  const responUser: UserInterface = {
    id: user.id,
    hash: user.hash,
    email: user.email,
    fullname: user.fullname,
    birthday: user.birthday,
    address: user.address
  };
  return Response.success({
    token,
    user: responUser
  });
});

export default axios;
