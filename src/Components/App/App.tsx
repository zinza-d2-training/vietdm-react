import React from 'react';
import Assets from "../../Assets";
import './App.scss';
import {Link} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={Assets('logo')} className="App-logo" alt="logo" />
        <Link to='auth/register' className="App-link">Register</Link>
      </header>
    </div>
  );
}

export default App;
