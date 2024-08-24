import React from "react";
import { useContext } from "react";
import BotContext from "../context/BotContext";
import ChatGlobalContext from "../context/ChatGlobalContext";
import { useLocation } from "react-router-dom";


function InputBox() {
    const location = useLocation()
    const context = location.pathname == "/bot" ? BotContext : ChatGlobalContext
    const { setInput, input, isSending, handleSend } = useContext(context);

    return (
        <div className="col-span-12 row-span-2 w-full flex Sticky items-center bg-red-500 p-2">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSend();
                        e.preventDefault();
                    }
                }}
                placeholder={isSending ? "Esperando respuesta..." : "Escribe un mensaje..."}
                disabled={isSending}
                className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
                onClick={() => handleSend()}
                disabled={isSending}
                className={`ml-2 px-4 py-2 text-white rounded ${isSending ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
                Enviar
            </button>
        </div>
    );
}


export default InputBox;
