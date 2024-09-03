import React, { useContext, useEffect, useState } from "react";
import BotContext from "../context/BotContext";
import { useInputFocus } from "../context/InputFocusContext";
import ChatGlobalContext from "../context/ChatGlobalContext";
import { useLocation } from "react-router-dom";

function InputBox({ className }) {
    const location = useLocation();
    const contexts = location.pathname === "/bot" ? BotContext : ChatGlobalContext;
    const { setInput, input, isSending, handleSend } = useContext(contexts);
    const { inputRef } = useInputFocus(); // Obtén la referencia del input
    

   // Estado del input 
   const [shouldFocus, setShouldFocus] = useState(false);

   // useEffect para aplicar el enfoque solo cuando sea necesario
   useEffect(() => {
       if (shouldFocus && inputRef.current && !isSending) {
           inputRef.current.focus();
           setShouldFocus(false); // Resetea el estado para evitar enfoque no deseado
       }
   }, [shouldFocus, isSending, inputRef]);
    return (
        <div className={`${className} flex items-center justify-center`}>
            <input
                type="text"
                id="chat-input"  // Asegúrate de que estos sean únicos
                name="chatInput" // Cambia el nombre si es necesario para evitar
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSend();
                        e.preventDefault();
                        setShouldFocus(true);
                    }
                }}
                placeholder={isSending ? "Esperando respuesta..." : "Escribe un mensaje..."}
                disabled={isSending}
                className="flex-1 px-4 py-2 border border-gray-600 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
                onClick={() => {
                    handleSend();
                    setShouldFocus(true); // Establece el estado para enfocar el input
                }}
                disabled={isSending}
                className={`text-white px-4 py-2 rounded ${isSending ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
                Enviar
            </button>
            </div>
    );
}

export default InputBox;
