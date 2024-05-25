// src/App.js
import React from 'react';
import './styles/App.css';
import Chat from './components/Chat';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Chat />
    </div>
  );
}

export default App;
