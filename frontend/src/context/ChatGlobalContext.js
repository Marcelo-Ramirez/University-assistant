import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import io from 'socket.io-client';

const ChatGlobalContext = createContext();

const ChatGlobalProvider = ({ children }) => {
    const [isSending, setIsSending] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [newSocket, setSocket] = useState(null);

    useEffect(() => {
        console.log('Inicializando conexión WebSocket...');
        const newSocket = io(`${window.origin}`);

        setSocket(newSocket);

        // Evento 'connect' para cuando la conexión se establece correctamente
        newSocket.on('connect', () => {
            console.log('Conexión WebSocket establecida con el ID:', newSocket.id);
        });

        // Evento 'connect_error' para manejar errores durante la conexión
        newSocket.on('connect_error', (error) => {
            console.error('Error en la conexión WebSocket:', error);
        });

        // Evento 'disconnect' para cuando la conexión se pierde
        newSocket.on('disconnect', (reason) => {
            console.warn('WebSocket desconectado:', reason);
        });

        // Escuchar preguntas iniciales
        newSocket.on('initial_preguntas', (data) => {
            console.log('Recibido evento initial_preguntas:', data);
            setMessages(data.messages);
        });

        // Escuchar nuevas preguntas
        newSocket.on('new_pregunta', (pregunta) => {
            console.log('Recibido evento new_pregunta:', pregunta);
            setMessages((prevMessages) => [...prevMessages, pregunta]);
        });

        // Evento genérico para capturar todos los eventos
        newSocket.onAny((event, ...args) => {
            console.debug(`Evento recibido: ${event}`, args);
        });

        return () => {
            console.log('Cerrando conexión WebSocket...');
            newSocket.close();
        };
    }, []);

    const handleSend = () => {
        if (!newSocket || !newSocket.connected) {
            console.error('No se puede enviar el mensaje: la conexión WebSocket no está establecida.');
            return;
        }

        setIsSending(true);
        const token = localStorage.getItem('token'); // Asegúrate de guardar el token en el login
        console.log("Preparando para enviar mensaje:", { input, token });

        // Emitir el mensaje
        newSocket.emit('send_pregunta', { message: input, token }, (response) => {
            console.log('Emit ejecutado. Esperando respuesta del servidor...');

            if (response && response.error) {
                console.error('Error al enviar mensaje al servidor:', response.error);
            } else if (response) {
                console.log('Mensaje enviado exitosamente al chat global:', response);
            } else {
                console.warn('No se recibió ninguna respuesta del servidor después del emit.');
            }
        });

        setIsSending(false);
    };


    const data = { messages, handleSend, input, setInput, isSending };

    return (
        <ChatGlobalContext.Provider value={data}>
            {children}
        </ChatGlobalContext.Provider>
    );
};

export { ChatGlobalProvider };
export default ChatGlobalContext;
