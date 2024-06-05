import React, { useState } from 'react';
import './styles/App.css';
import Chat from './components/Chat';
import Header from './components/Header';
import SlidingChat from './components/SlidingChat';
import RegisterModal from './components/RegisterModal';
import sendMessage from './services/api.js'

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

  return (
    <div className="App">
      <Header onMenuClick={handleMenuClick} onRegisterClick={handleRegisterClick} />
      <Chat sendMessage={sendMessage} isMenuOpen={isMenuOpen} />
      <SlidingChat isOpen={isMenuOpen} onClose={handleCloseMenu} messages={communityMessages} />
      <RegisterModal isOpen={isRegisterModalOpen} onClose={handleCloseRegisterModal} />
    </div>
  );
}

export default App;
