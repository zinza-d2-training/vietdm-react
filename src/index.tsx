import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './Store';
import ListRoutes from './Routes/Route';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import './Assets/scss/base.scss';
import '@fontsource/montserrat';

const theme = createTheme({
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    allVariants: {
      marginBottom: '0.75rem'
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>{ListRoutes()}</BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
