import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import '../styles/SlidingMenu.css';
import SCMessage from './SCMessage';

const SlidingChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const newSocket = io(`${window.origin}`);
      setSocket(newSocket);

      // Escuchar preguntas iniciales
      newSocket.on('initial_preguntas', (data) => {
        setMessages(data.messages);
        scrollToBottom(); // Desplazarse al final cuando se cargan las preguntas iniciales
      });

      // Escuchar nuevas preguntas
      newSocket.on('new_pregunta', (pregunta) => {
        setMessages((prevMessages) => [...prevMessages, pregunta]);
        scrollToBottom(); // Desplazarse al final cuando llega una nueva pregunta
      });

      return () => newSocket.close();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default SlidingChat;
