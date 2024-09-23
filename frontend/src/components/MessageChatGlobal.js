import React, { useEffect } from "react";
import chatbot_icon from '../assets/images/chatbot_icon.png';
import user_icon from '../assets/images/user_icon.png';
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client"; // Importa el cliente de SocketIO

const socket = io(window.origin); // Conectar con el servidor SocketIO

function SCMessage({ text, sender, id }) {
    const isUser = sender === 'user';
    const icon = isUser
        ? <img src={user_icon} alt="User Icon" className="h-8 w-8 rounded-full" />
        : <img src={chatbot_icon} alt="Chatbot Icon" className="h-8 w-8 rounded-full" />;
    const { username, carrera, fecha } = sender;

    // PARA OBTENER LA HORA EN QUE SE ENVIO EL MENSAJE
    const fechaActual = new Date();
    const fechaComentario = fecha;

    const fechaComentarioDate = new Date(fechaComentario);
    const diferenciaTiempo = fechaActual - fechaComentarioDate;
    const segundos = Math.floor(diferenciaTiempo / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const días = Math.floor(horas / 24);
    const semanas = Math.floor(días / 7);
    const meses = Math.floor(días / 30);
    const años = Math.floor(días / 365);

    function obtenerTiempoTranscurrido() {
        if (años > 0) {
            return ` hace ${años} año${años > 1 ? 's' : ''}`;
        } else if (meses > 0) {
            return ` hace ${meses} mes${meses > 1 ? 'es' : ''}`;
        } else if (semanas > 0) {
            return ` hace ${semanas} semana${semanas > 1 ? 's' : ''}`;
        } else if (días > 0) {
            return ` hace ${días} día${días > 1 ? 's' : ''}`;
        } else if (horas > 0) {
            return ` hace ${horas} hora${horas > 1 ? 's' : ''}`;
        } else if (minutos > 0) {
            return ` hace ${minutos} minuto${minutos > 1 ? 's' : ''}`;
        } else {
            return ` hace ${segundos} segundo${segundos > 1 ? 's' : ''}`;
        }
    }

    const location = useLocation();
    useEffect(() => {
        const currentTime = new Date().toLocaleTimeString();
        console.log(`La ruta ha cambiado. Hora actual: ${currentTime}`);
    }, [location]);

    // Función para manejar el clic en el botón Like usando SocketIO
    const handleLikeClick = () => {
        console.log(`Botón de Like con ID: ${id}`);

        // Emitir evento de like usando SocketIO con el username incluido
        socket.emit("like_pregunta", { messageId: id, username });
    };

    return (
        <div className={`flex flex-col mb-4 ${isUser ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'} rounded-lg`}>
            <div className="flex items-center mb-2">
                {icon}
                <div className="ml-2">
                    <span className="font-semibold text-sm">{username}</span>
                    <span className="text-xs text-gray-500">{obtenerTiempoTranscurrido()}</span>
                    <span className="block text-xs text-gray-500">{carrera}</span>
                </div>
            </div>
            <p className="text-sm">{text}</p>
            <div className="flex justify-start mt-2">
                <button id={`${id}`} onClick={handleLikeClick}>
                    Like
                </button>
            </div>
        </div>
    );
}

export default SCMessage;
