import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header id="header"/>
        <Home />
      </div>
    );
  }
}

export default App;
