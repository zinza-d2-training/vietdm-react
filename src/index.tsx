import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import ListRoutes from './Routes';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            {ListRoutes()}
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
