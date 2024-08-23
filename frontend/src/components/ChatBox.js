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
        <div className= {`${className} overflow-y-auto col-span-12 row-span-10 h-full grid grid-rows-12 bg-red-500`}>
        <div className = "col-span-12 row-span-12 bg-green-500" >
            <div className="flex-1 bg-yellow-500">
                {messages.map((msg) => (
                    <Message key={msg.id} text={msg.text} sender={msg.sender} />
                ))}
                <div ref={messagesEndRef} />
            </div>
        </div >
        </div>
);
}

export default ChatBox;
