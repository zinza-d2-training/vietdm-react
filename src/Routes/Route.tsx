import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from '../Components/App/App';
import Auth from '../Components/Auth/Auth';
import User from '../Components/User';

function ListRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/user/*" element={<User />} />
    </Routes>
  );
}

export default ListRoutes;
