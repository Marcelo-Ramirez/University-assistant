import React, { useRef, useEffect, useContext } from "react";
import Message from "./Message";
import BotContext from "../context/BotContext";
import ChatGlobalContext from "../context/ChatGlobalContext";
import { useLocation } from "react-router-dom";
import SCMessage from "./SCMessage"

function ChatBox({className}) {
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
        <div className= {`${className} overflow-y-auto  h-full flex-1 bg-gray-100`}>
                {location.pathname == "/bot" ? messages.map((msg, index) => (
                    <Message key={index} text={msg.text} sender={msg.sender} />
                )) : messages.map((msg, index) => (
                    <SCMessage key={index} text={msg.message} sender={msg}  fecha={msg.fecha}/>
                ))}
                <div ref={messagesEndRef} />
        </div>
);
}

export default ChatBox;
