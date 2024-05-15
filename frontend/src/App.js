import React from 'react';
import './App.css';
import Chat from './components/Chat';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1 className="header-title">Loyobot</h1>
        </div>
      </header>
      <Chat />
    </div>
  );
}

export default App;
