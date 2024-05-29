import React from 'react';
import '../styles/SlidingMenu.css';
import Message from './Message';

const SlidingMenu = ({ isOpen, onClose, messages }) => {
  return (
    <div className={`sliding-menu ${isOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={onClose}>×</button>
      <div className="menu-content">
        <h2>Comunidad</h2>
        <div className="messages">
          {messages.map((msg) => (
            <Message key={msg.id} text={msg.text} sender={msg.sender} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlidingMenu;
