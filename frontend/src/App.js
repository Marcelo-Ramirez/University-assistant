import React, { useState } from 'react';
import './App.css';
import Chat from './components/Chat';
import Switch from 'react-switch'; // Asegúrate de instalar 'react-switch'

function App() {
  const [isSecondaryInstance, setIsSecondaryInstance] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1 className="header-title">Loyobot</h1>
          <div className="header-switch-container">
            <Switch
              checked={isSecondaryInstance}
              onChange={setIsSecondaryInstance}
              offColor="#ccc"
              onColor="#f38080"
              uncheckedIcon={false}
              checkedIcon={false}
              className="header-switch"
            />
          </div>
        </div>
      </header>
      <Chat isSecondaryInstance={isSecondaryInstance} />
    </div>
  );
}

export default App;
