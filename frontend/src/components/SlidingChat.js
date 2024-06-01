import React from 'react';
import '../styles/SlidingMenu.css';
import SCMessage from './SCMessage';

const SlidingChat = ({ isOpen, onClose, messages }) => {
  return (
    <div className={`sliding-menu ${isOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={onClose}>×</button>
      <div className="menu-content">
        <h2>Chat</h2>
        <div className="messages">
          {messages.map((msg) => (
            <SCMessage key={msg.id} text={msg.text} sender={msg.sender} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlidingChat;
