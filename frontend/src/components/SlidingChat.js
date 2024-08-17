import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import '../styles/SlidingMenu.css';
import SCMessage from './SCMessage';

const SlidingChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { message: 'Hola a todos, ¿cómo están?', username: 'Juan Perez', carrera: 'Electronica' },
    { message: 'Hola Juan, todo bien. ¿Y tú?', username: 'Maria Lopez', carrera: 'Sistemas' },
    { message: 'Hola Maria, estoy bien, gracias. ¿Qué tal tus estudios?', username: 'Juan Perez', carrera: 'Electronica' },
    { message: 'Un poco estresada con los exámenes, pero sobreviviendo.', username: 'Maria Lopez', carrera: 'Sistemas' },
    { message: '¿Alguien ha visto las notas del último examen?', username: 'Carlos Martinez', carrera: 'Industrial' }
]);
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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`sliding-menu ${isOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={onClose}>×</button>
      <div className="menu-content">
        <h2>Loyochat</h2>
        <div className="messages">
          {messages.map((msg, index) => (
            <SCMessage key={index} text={msg.message} sender={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default SlidingChat;
