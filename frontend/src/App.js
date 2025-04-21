import React from 'react';
import './App.css';
import MythBusterChat from './components/MythBusterChat';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Fitness Myth Buster</h1>
        <p>Enter a fitness claim to get a scientifically-backed analysis.</p>
      </header>
      <MythBusterChat />
    </div>
  );
}

export default App;