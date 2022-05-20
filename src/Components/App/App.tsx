import React from 'react';
import Assets from '../../Assets';
import { Link } from 'react-router-dom';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={Assets('logo')} className="App-logo" alt="logo" />
        <Link to="auth/login" className="App-link">
          Login
        </Link>
        <Link to="user" className="App-link">
          User
        </Link>
      </header>
    </div>
  );
}

export default App;
