import React, { useRef, useEffect } from "react";
import Message from "./Message";
import { useContext } from "react";
import BotContext from "../context/BotContext";

function ChatBox({className}) {
    const messagesEndRef = useRef(null);
    const { messages } = useContext(BotContext)


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    return (
        <div className= {`${className} overflow-y-auto  h-full  bg-green-500 flex-1`}>
                {messages.map((msg) => (
                    <Message key={msg.id} text={msg.text} sender={msg.sender} />
                ))}
                <div ref={messagesEndRef} />
        </div>
);
}

export default ChatBox;
