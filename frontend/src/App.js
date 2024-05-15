import React from 'react';
import './App.css';
import Chat from './components/Chat';
import logo from './loyola.png'; // Asegúrate de reemplazar 'path_to_your_image.png' con la ruta real a tu imagen

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
        <img src={logo} alt="Logo" className="logo" />
          <h1 className="header-title">Loyobot</h1>
        </div>
      </header>
      <Chat />
    </div>
  );
}

export default App;
