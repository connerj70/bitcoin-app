import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Portfolio from './components/Portfolio/Portfolio.js';
import {Switch, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header id="header"/>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/portfolio" component={Portfolio}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
