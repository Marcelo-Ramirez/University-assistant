import React from 'react';
import chatbot_icon from '../assets/images/chatbot_icon.png';
import user_icon from '../assets/images/user_icon.png';

function SCMessage({ text, sender }) {
    // Verificar si sender está definido y tiene propiedades necesarias
    const isUser = sender && sender === 'user';
    const icon = isUser 
        ? <img src={user_icon} alt="User Icon" className="h-8 w-8 rounded-full" /> 
        : <img src={chatbot_icon} alt="Chatbot Icon" className="h-8 w-8 rounded-full" />;

    // Asegurarse de que sender es un objeto con propiedades username y carrera
    const username = sender && typeof sender === 'object' ? sender.username : 'Unknown';
    const carrera = sender && typeof sender === 'object' ? sender.carrera : 'Unknown';

    return (
        <div className={`flex flex-col mb-4 ${isUser ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'} rounded-lg`}>
            <div className="flex items-center mb-2">
                {icon}
                <div className="ml-2">
                    <span className="block font-semibold text-sm">{username}</span>
                    <span className="block text-xs text-gray-500">{carrera}</span>
                </div>
            </div>
            <p className="text-sm">{text}</p>
        </div>
    );
}

export default SCMessage;
