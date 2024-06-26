import React from 'react';
import chatbot_icon from '../assets/chatbot_icon.png';
import user_icon from '../assets/user_icon.png';
import '../styles/SCMessage.css';

function SCMessage({ text, sender }) {
    const isUser = sender === 'user';
    const icon = isUser ? <img src={user_icon} alt="User Icon" className="logochat" /> : <img src={chatbot_icon} alt="Chatbot Icon" className="logochat" />;
    const { username, carrera } = sender;

    return (
        <div className={`message ${isUser ? 'user' : 'chatbot'}`}>
            <div className="message-header">
                {icon}
                <span className="username">{username}</span>
                <span className="carrera">{carrera}</span>
            </div>
            <p className="message-text">{text}</p>
        </div>
    );
}

export default SCMessage;
