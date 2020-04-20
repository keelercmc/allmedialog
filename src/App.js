import React from 'react';
import './App.css';
import axios from 'axios';

const test = () => {
  const post = '5';
  axios.post('https://allmedialog.firebaseio.com/example.json', post);
}

function App() {
  return (
    <div className="App">
      <button onClick={test}>hi</button>
    </div>
  );
}

export default App;
