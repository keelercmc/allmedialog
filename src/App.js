import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import Toolbar from './components/Nav/Toolbar/Toolbar';
import Statistics from './components/Statistics/Statistics';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Toolbar/>
        <Route path="/stats" exact component={Statistics}/>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
