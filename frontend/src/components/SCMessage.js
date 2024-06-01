import React from 'react';
import chatbot_icon from '../assets/chatbot_icon.png'; // Asegúrate de reemplazar 'path_to_your_image.png' con la ruta real a tu imagen
import user_icon from '../assets/user_icon.png'; // Asegúrate de reemplazar 'path_to_your_user_icon.png' con la ruta real a tu imagen

function SCMessage({ text, sender }) {
    const isUser = sender === 'user';
    const icon = isUser ? <img src={user_icon} alt="User Icon" className="logochat" /> : <img src={chatbot_icon} alt="Logo" className="logochat" />;

    return (
        <div className={`message ${sender}`} >
            <p>{icon} {text}</p>
        </div>
    );
}

export default SCMessage;
