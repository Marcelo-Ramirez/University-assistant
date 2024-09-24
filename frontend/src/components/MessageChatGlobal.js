import React, { useEffect, useState } from "react";
import chatbot_icon from '../assets/images/chatbot_icon.png';
import user_icon from '../assets/images/user_icon.png';
import { io } from "socket.io-client";

// Conexión al socket
const socket = io(window.origin);

function SCMessage({ text, sender, id }) {
    const isUser = sender === 'user';
    const icon = isUser
        ? <img src={user_icon} alt="User Icon" className="h-8 w-8 rounded-full" />
        : <img src={chatbot_icon} alt="Chatbot Icon" className="h-8 w-8 rounded-full" />;
    
    const { username, carrera, fecha } = sender;

    // Estado para el contador de likes
    const [likeCount, setLikeCount] = useState(0);
    const [hasLiked, setHasLiked] = useState(false); // Estado para controlar si el usuario ya ha dado like
    // Efecto para obtener el contador de likes al cargar el componente
    useEffect(() => {
        // Solicitar el contador de likes al cargar el componente
        socket.emit("get_like_count", id);

        // Escuchar la respuesta del servidor
        socket.on("like_count_response", ({ preguntas_id, total_likes }) => {
            if (preguntas_id === id) {
                setLikeCount(total_likes);
            }
        });

        // Cleanup del efecto
        return () => {
            socket.off("like_count_response");
        };
    }, [id]);

    // Función para manejar el clic en el botón Like usando SocketIO
    const handleLikeClick = () => {
        const token = localStorage.getItem('token'); ;

        // Emitir el evento de like
        socket.emit("like_pregunta", { messageId: id, username, token });

        // Actualizar localmente el contador de likes basado en si el usuario ha dado like
        if (hasLiked) {
            // Si el usuario ya ha dado like, decrementamos el contador
            setLikeCount(prevCount => prevCount - 1);
        } else {
            // Si el usuario no ha dado like, incrementamos el contador
            setLikeCount(prevCount => prevCount + 1);
        }

        // Alternar el estado de hasLiked
        setHasLiked(prevState => !prevState);
    };

    // Para obtener la hora en que se envió el mensaje
    const obtenerTiempoTranscurrido = () => {
        const fechaComentarioDate = new Date(fecha);
        const fechaActual = new Date();
        const diferenciaTiempo = fechaActual - fechaComentarioDate;
        const segundos = Math.floor(diferenciaTiempo / 1000);
        const minutos = Math.floor(segundos / 60);
        const horas = Math.floor(minutos / 60);
        const días = Math.floor(horas / 24);
        const semanas = Math.floor(días / 7);
        const meses = Math.floor(días / 30);
        const años = Math.floor(días / 365);

        if (años > 0) {
            return `hace ${años} año${años > 1 ? 's' : ''}`;
        } else if (meses > 0) {
            return `hace ${meses} mes${meses > 1 ? 'es' : ''}`;
        } else if (semanas > 0) {
            return `hace ${semanas} semana${semanas > 1 ? 's' : ''}`;
        } else if (días > 0) {
            return `hace ${días} día${días > 1 ? 's' : ''}`;
        } else if (horas > 0) {
            return `hace ${horas} hora${horas > 1 ? 's' : ''}`;
        } else if (minutos > 0) {
            return `hace ${minutos} minuto${minutos > 1 ? 's' : ''}`;
        } else {
            return `hace ${segundos} segundo${segundos > 1 ? 's' : ''}`;
        }
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
                {hasLiked ? '👍' : '👎'} {/* Emoji de like o deslike */}
                </button>
                <span className="ml-2">{likeCount}</span> {/* Mostrar contador de likes */}
            </div>
        </div>
    );
}

export default SCMessage;
