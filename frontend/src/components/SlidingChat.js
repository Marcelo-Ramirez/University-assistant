import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import '../styles/SlidingMenu.css';
import SCMessage from './SCMessage';

const SlidingChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const newSocket = io(`${window.origin}`);
      setSocket(newSocket);

      // Escuchar mensajes iniciales
      newSocket.on('initial_messages', (data) => {
        setMessages(data.messages);
      });

      // Escuchar nuevos mensajes
      newSocket.on('new_message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => newSocket.close();
    }
  }, [isOpen]);

  const sendMessage = (message) => {
    const token = localStorage.getItem('token'); // Asegúrate de guardar el token en el login
    socket.emit('send_message', { message, token });
  };

  return (
    <div className={`sliding-menu ${isOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={onClose}>×</button>
      <div className="menu-content">
        <h2>Chat</h2>
        <div className="messages">
          {messages.map((msg, index) => (
            <SCMessage key={index} text={msg.message} sender={`${msg.username} (${msg.carrera})`} />
          ))}
        </div>
        <input type="text" placeholder="Type a message..." onKeyDown={(e) => {
          if (e.key === 'Enter') {
            sendMessage(e.target.value);
            e.target.value = '';
          }
        }} />
      </div>
    </div>
  );
};

export default SlidingChat;
