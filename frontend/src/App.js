import React, { useState } from 'react';
import './styles/App.css';
import Chat from './components/Chat';
import Header from './components/Header';
import SlidingMenu from './components/SlidingMenu';
import RegisterModal from './components/RegisterModal';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [communityMessages, setCommunityMessages] = useState([]);

  const handleMenuClick = () => {
    setIsMenuOpen(true);
  };

  const handleRegisterClick = () => {
    setIsRegisterModalOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const sendMessage = (message, isGlobal) => {
    if (isGlobal) {
      // Actualizar mensajes de la comunidad
      setCommunityMessages(prevMessages => [...prevMessages, { id: prevMessages.length + 1, text: message, sender: 'user' }]);
      return Promise.resolve('Mensaje enviado al chat global');
    } else {
      return fetch(`${window.origin}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })
      .then(response => response.json())
      .then(() => {
        return fetch(`${window.origin}/get`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message }),
        })
        .then(response => response.json())
        .then(data => data.response);
      });
    }
  };

  return (
    <div className="App">
      <Header onMenuClick={handleMenuClick} onRegisterClick={handleRegisterClick} />
      <Chat sendMessage={sendMessage} isMenuOpen={isMenuOpen} />
      <SlidingMenu isOpen={isMenuOpen} onClose={handleCloseMenu} messages={communityMessages} />
      <RegisterModal isOpen={isRegisterModalOpen} onClose={handleCloseRegisterModal} />
    </div>
  );
}

export default App;
