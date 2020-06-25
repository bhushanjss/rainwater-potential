import React from 'react';
import { Container } from '@material-ui/core';

import logo from './resources/logo.png';
import './App.css';
import LandForm from './components/LandForm';

function App() {
  return (
    
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Rainwater Harvesting Potential</h1>
      </header>
      <Container maxWidth="sm">
        <LandForm className="land-form" />
      </Container>      
    </div>
  );
}

export default App;
