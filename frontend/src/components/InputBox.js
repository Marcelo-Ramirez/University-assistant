import React, { useContext, useEffect, useState } from "react";
import BotContext from "../context/BotContext";
import { useInputFocus } from "../context/InputFocusContext";
import ChatGlobalContext from "../context/ChatGlobalContext";
import { useLocation } from "react-router-dom";
import SendIcon from '../assets/images/send_icon.svg';

function InputBox({ className }) {
    const location = useLocation();
    const contexts = location.pathname === "/bot" ? BotContext : ChatGlobalContext;
    const { setInput, input, isSending, handleSend } = useContext(contexts);
    const { inputRef } = useInputFocus();

    const [shouldFocus, setShouldFocus] = useState(false);

    useEffect(() => {
        if (shouldFocus && inputRef.current && !isSending) {
            inputRef.current.focus();
            setShouldFocus(false);
        }
    }, [shouldFocus, isSending, inputRef]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (input.trim()) { // Verifica si el input no está vacío
                handleSend(); // Envía el mensaje solo si hay contenido
            }
            setShouldFocus(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario
        if (input.trim()) { // Verifica si el input no está vacío
            handleSend(); // Envía el mensaje solo si hay contenido
        }
        setShouldFocus(true);
    };

    return (
        <form className={`${className} flex items-center justify-center`} onSubmit={handleSubmit}>
            <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                placeholder={isSending ? "Esperando respuesta..." : "Escribe un mensaje..."}
                disabled={isSending}
                rows={1}
                className="flex-1 px-4 py-2 border border-gray-600 rounded focus:outline-none focus:ring focus:border-blue-300 resize-none"
            />
            <button
                type="submit" // Cambia a tipo submit para enviar el formulario
                disabled={isSending}
                className={`text-white px-4 ml-2 py-2 rounded ${isSending ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
                <img src={SendIcon} alt="Enviar" className="w-5 h-5" />
            </button>
        </form>
    );
}

export default InputBox;
