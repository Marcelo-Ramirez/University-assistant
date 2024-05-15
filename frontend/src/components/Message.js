import React, { useState, useEffect, useRef } from 'react';

function Message({ text, sender }) {
  const isUser = sender === 'user';
  const icon = isUser ? '👤' : '🖥️';
  const [serverMessage, setServerMessage] = useState('');
  const messageEndRef = useRef(null); // Referencia para el final del mensaje

  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    let i = 0;
    if (!isUser) {
      const timer = setInterval(() => {
        if (i < text.length) {
          setServerMessage((prevMessage) => prevMessage + text.charAt(i));
          i++;
          scrollToBottom(); // Desplaza la vista al fondo
        } else {
          clearInterval(timer);
        }
      }, 10); // Ajusta este tiempo según sea necesario
      return () => clearInterval(timer);
    }
  }, [text, isUser]);

  return (
    <div className={`message ${sender}`}>
      <p>{icon} {isUser ? text : serverMessage}</p>
      <div ref={messageEndRef} /> {/* Elemento de referencia */}
    </div>
  );
}

export default Message;
