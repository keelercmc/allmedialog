import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import Toolbar from './components/Nav/Toolbar/Toolbar';
import List from './components/List/List';
import Statistics from './components/Statistics/Statistics';
import Login from './components/Login/Login';


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
