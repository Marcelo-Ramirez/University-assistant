import React, { useRef, useEffect } from "react";
import Message from "./Message";
import { useContext } from "react";
import BotContext from "../context/BotContext";

function ChatBox() {
    const messagesEndRef = useRef(null);
    const { messages } = useContext(BotContext)


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    return (
        <div className = "col-span-12 row-span-10 flex flex-col max-h-screen overflow-y-auto p-4 bg-gray-100" >
            <div className="flex-1 bg-yellow-500 overflow-y-auto ">
                {messages.map((msg) => (
                    <Message key={msg.id} text={msg.text} sender={msg.sender} />
                ))}
                <div ref={messagesEndRef} />
            </div>
        </div >
);
}

export default ChatBox;
