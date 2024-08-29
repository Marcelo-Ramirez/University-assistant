import React, { useRef, useEffect, useContext, useState } from "react";
import Message from "./Message";
import BotContext from "../context/BotContext";
import ChatGlobalContext from "../context/ChatGlobalContext";
import { useLocation } from "react-router-dom";
import SCMessage from "./SCMessage";

function ChatBox({ className }) {
    const messagesEndRef = useRef(null);
    const containerRef = useRef(null); // Referencia al contenedor de mensajes
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const location = useLocation();

    // Uso de un solo hook `useContext` en base a la ruta
    const context = location.pathname === "/bot" ? BotContext : ChatGlobalContext;
    const { messages, loadMoreMessages } = useContext(context);

    // Función para manejar el scroll y mostrar el botón
    const handleScroll = () => {
        const container = containerRef.current;
        if (!container) return;

        // Mostrar el botón si estamos en la parte superior
        const isAtTop = container.scrollTop === 0;
        setShowScrollToTop(isAtTop);
    };

    useEffect(() => {
        // scroll hacia abajo automatico cuando se cambie de pagina 
        scrollToBottom();
    }, [location.pathname]);

    // Función para hacer scroll hacia abajo
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Función para cargar más mensajes sin cambiar la posición del scroll
    const handleLoadMoreMessages = () => {
        const container = containerRef.current;
        if (!container) return;

        // Guardar la posición actual del scroll y la altura del contenedor
        const previousScrollTop = container.scrollTop;
        const previousScrollHeight = container.scrollHeight;

        // Cargar más mensajes
        loadMoreMessages();

        // Restaurar la posición del scroll después de que el contenedor se actualice
        setTimeout(() => {
            container.scrollTop = previousScrollTop + (container.scrollHeight - previousScrollHeight);
        }, 120); // Pequeño retraso para permitir que el DOM se actualice
    };

    return (
        <div
            ref={containerRef}
            className={`${className} overflow-y-auto h-full flex-1 bg-gray-100 relative`} // Añadido relative para posicionar el botón
            onScroll={location.pathname === "/Chat" ? handleScroll : undefined}
        >
            {location.pathname === "/Chat" && showScrollToTop && (
                <button
                    className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-2 rounded"
                    onClick={handleLoadMoreMessages}
                >
                    ⬆️
                </button>
            )}

            {location.pathname === "/bot"
                ? messages.map((msg, index) => (
                    <Message key={index} text={msg.text} sender={msg.sender} />
                ))
                : messages.map((msg, index) => (
                    <SCMessage key={index} text={msg.message} sender={msg} fecha={msg.fecha} />
                ))}
            <div ref={messagesEndRef} />
        </div>
    );
}

export default ChatBox;
