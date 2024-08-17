import React, { useState } from 'react';
import Chat from '../components/Chat';
import SlidingChat from '../components/SlidingChat';
import RegisterModal from '../components/RegisterModal';
import sendMessage from '../services/api.js'

function Bot() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const handleCloseMenu = () => {
        setIsMenuOpen(false);
    };

    const handleCloseRegisterModal = () => {
        setIsRegisterModalOpen(false);
    };

    return (
        <div className="App">
            <Chat sendMessage={sendMessage} isMenuOpen={isMenuOpen} />
            <SlidingChat isOpen={isMenuOpen} onClose={handleCloseMenu} sendMessage={sendMessage} />
            <RegisterModal isOpen={isRegisterModalOpen} onClose={handleCloseRegisterModal} />
        </div>
    );
}

export default Bot;
