import React, { useRef, useEffect, useContext } from "react";
import Message from "./Message";
import BotContext from "../context/BotContext";
import ChatGlobalContext from "../context/ChatGlobalContext";
import { useLocation } from "react-router-dom";
import SCMessage from "./SCMessage"

function ChatBox() {
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

    return (
        <div className="col-span-12 row-span-10 flex flex-col max-h-screen overflow-y-auto p-4 bg-gray-100">
            <div className="flex-1 bg-yellow-500 overflow-y-auto">
                {location.pathname == "/bot" ? messages.map((msg, index) => (
                    <Message key={index} text={msg.text} sender={msg.sender} />
                )) : messages.map((msg, index) => (
                    <SCMessage key={index} text={msg.message} sender={msg} />
                ))}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}

export default ChatBox;
