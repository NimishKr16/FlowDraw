// src/App.js
import React, { useState } from 'react';
import Canvas from './Canvas';
import './App.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <header>
        <h1>FlowDraw</h1>
  <h2>By Nimish Kumar </h2>
        <button onClick={toggleDarkMode}>
          Switch to {darkMode ? 'Light' : 'Dark'} Mode
        </button>
      </header>
      <Canvas darkMode={darkMode} />
    </div>
  );
};

export default App;
