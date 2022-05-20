import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './Store';
import ListRoutes from './Routes/Route';
import { BrowserRouter } from 'react-router-dom';
import Loading from './Components/Loading';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Loading />
      <BrowserRouter>{ListRoutes()}</BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
