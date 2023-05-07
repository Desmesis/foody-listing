import React from 'react';
import logo from './logo.svg';
import './App.css';
import NearbyRestaurants from './components/NearbyRestaurants';
import Navbar from './components/default/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <NearbyRestaurants />
    </div>
  );
}

export default App;
