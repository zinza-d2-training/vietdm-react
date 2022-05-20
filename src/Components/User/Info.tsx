import { useAppSelector } from '../../Store/HookStore';
import { RootState } from '../../Store';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Info() {
  const userData = useAppSelector((state: RootState) => state.users.data);
  return (
    <div
      style={{
        marginTop: '1rem',
        marginLeft: '1rem'
      }}>
      <h3>Hi {userData?.fullname}</h3>
      <Link to="/auth/logout" className="mtb-3 d-flex">
        Logout
      </Link>
      <ul
        style={{
          paddingLeft: '1rem'
        }}>
        <li>id: {userData?.id}</li>
        <li>hash: {userData?.hash}</li>
        <li>email: {userData?.email}</li>
        <li>fullname: {userData?.fullname}</li>
        <li>birthday: {userData?.birthday}</li>
        <li>address: {userData?.address}</li>
      </ul>
    </div>
  );
}
