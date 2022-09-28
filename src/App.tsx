import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { getCountries } from './utils/openaq-api';
import AQComparePage from './pages/aq-comp-page';
import { Container } from '@mui/material';

function App() {
  return (
    <div className="App" >
        <AQComparePage/>
        <AQComparePage/>
    </div>
  );
}

export default App;
