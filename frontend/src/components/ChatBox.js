//import React, { useRef, useEffect, useContext  } from "react";
import React, { useRef, useEffect, useContext, useState } from "react";
import Message from "./Message";
import BotContext from "../context/BotContext";
import ChatGlobalContext from "../context/ChatGlobalContext";
import { useLocation } from "react-router-dom";
import SCMessage from "./SCMessage"

function ChatBox({ className }) {
    const messagesEndRef = useRef(null);
    const location = useLocation();

    // Uso de un solo hook `useContext` en base a la ruta
    const context = location.pathname === "/bot" ? BotContext : ChatGlobalContext;
    const { messages } = useContext(context);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    ///////////////////////// prueba preguntas con mas likes
    const [inputValue, setInputValue] = useState('');

    const questions = [
        '¿Cuáles son los requisitos de admisión?',
        '¿Cuáles son los costos de matrícula?',
        '¿Qué becas están disponibles?',
        '¿Cómo puedo contactar al soporte técnico?',
    ];

    const handleButtonClick = (question) => {
        setInputValue(question);
    };




    return (
        <div className={`${className} col-span-12 row-span-10 flex flex-col max-h-screen border-l-2 border-r-2 border-yellow-500 overflow-y-auto bg-gray-100`}>
            <div className="flex-1 overflow-y-auto p-3">

                {/* Aqui colocamos para que se muestren las preguntas mas likeadas,
                pero no funciona todavia */}
                {location.pathname == "/bot" ? <div class="container mx-auto">

                    <div className="container mx-auto px-8 md:px-0">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
                            {/* Aqui se renderizan las consultas que vienen del servidor*/}
                            {questions.map((question, index) => (
                                <button
                                    key={index}
                                    /* Aqui se dan estilos a las consultas*/
                                    className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 flex items-center justify-center p-4 text-center text-gray-900 hover:bg-gray-100 hover:text-blue-600"
                                    onClick={() => handleButtonClick(question)}
                                >
                                    {question}
                                </button>
                            ))}
                        </div>
                        <div className="flex flex-col items-center">
                            <input
                                type="text"
                                value={inputValue}
                                readOnly
                                className="border border-gray-300 rounded-lg p-4 mb-4 w-full max-w-md text-gray-900"
                            />
                        </div>
                    </div>
                </div> : <div></div>}
                {/* Fin del método */}



                {location.pathname == "/bot" ? messages.map((msg, index) => (
                    // Message es de el chatBot
                    <Message key={index} text={msg.text} sender={msg.sender} />
                )) : messages.map((msg, index) => (
                    // SCMessage es del chat Global
                    <SCMessage key={index} text={msg.message} sender={msg} />
                ))}

                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}

export default ChatBox;
