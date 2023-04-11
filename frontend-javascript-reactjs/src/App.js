import React from 'react';
import logo from './logo.svg';
import './App.css';

import WelcomePage from './components/WelcomePage';
import FlightInformation from './components/FlightInformation';

function App() {
  return (
      <div className="App">
        <WelcomePage />
        <Route path="/flight-information" component={FlightInformation} />
      </div>
  );
}

export default App;
