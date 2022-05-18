import { Route, Routes } from 'react-router-dom';
import App from '../App';
import React from 'react';

function ListRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      {/*<Route path="/auth/*" element={<Auth />} />*/}
    </Routes>
  );
}

export default ListRoutes;
