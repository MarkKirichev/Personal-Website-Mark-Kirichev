import React from 'react';
import logo from './logo.svg';
import './App.css';

import WelcomePage from './components/WelcomePage';
import FlightInformation from './components/FlightInformation';
import MapComponent from './components/MapComponent';

function App() {
  return (
      <div className="App">
        <WelcomePage />
        <MapComponent flights={flights} mapRegion="world" />
        <Route path="/flight-information" component={FlightInformation} />
      </div>
  );
}

export default App;
