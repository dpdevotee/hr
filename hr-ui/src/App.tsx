import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Routes,
  Route,
} from 'react-router-dom'
import Home from './components/Home';
import Regions from './components/Regions';
import Navigation from './components/Navigation'


function App() {
  return (
    <div className="App">
      <Navigation/>
      <div className="App-intro">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="regions" element={<Regions />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
