import React, { Component } from 'react';
import './App.css';
import FlyBuild from './FlyBuild';
import FlyStats from './FlyStats';
import FlySim from './FlySim';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FlyBuild />
        <FlyStats />
        <FlySim />
      </div>
    );
  }
}

export default App;
