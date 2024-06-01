import React, { useState, useEffect, useRef } from 'react';
import chatbot_icon from '../assets/chatbot_icon.png'; // Asegúrate de reemplazar 'path_to_your_image.png' con la ruta real a tu imagen
import user_icon from '../assets/user_icon.png'; // Asegúrate de reemplazar 'path_to_your_user_icon.png' con la ruta real a tu imagen

function* typewriterEffect(text) {
  for (let i = 0; i < text.length; i++) {
    yield text.slice(0, i + 1);
  }
}

function Message({ text, sender }) {
  const isUser = sender === 'user';
  const icon = isUser ? <img src={user_icon} alt="User Icon" className="logochat" /> : <img src={chatbot_icon} alt="Logo" className="logochat" />;
  const [serverMessage, setServerMessage] = useState('');
  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!isUser) {
      const generator = typewriterEffect(text);
      const timer = setInterval(() => {
        const { value, done } = generator.next();
        if (done) {
          clearInterval(timer);
        } else {
          setServerMessage(value);
          scrollToBottom();
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
