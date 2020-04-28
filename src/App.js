import React from 'react';

import './App.css';

import { BrowserRouter, Route } from 'react-router-dom';

import Toolbar from './components/Nav/Toolbar/Toolbar';
import List from './containers/List/List';
import Statistics from './components/Statistics/Statistics';
import Login from './containers/Login/Login';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Toolbar/>
        <Route path="/" exact component={List}/>
        <Route path="/stats" exact component={Statistics}/>
        <Route path="/login" exact component={Login}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
