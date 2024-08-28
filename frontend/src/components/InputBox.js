import React from "react";
import { useContext } from "react";
import BotContext from "../context/BotContext";
import ChatGlobalContext from "../context/ChatGlobalContext";
import { useLocation } from "react-router-dom";


function InputBox({className}) {
    const location = useLocation()
    const context = location.pathname == "/bot" ? BotContext : ChatGlobalContext
    const { setInput, input, isSending, handleSend } = useContext(context);

    return (
        <div className= {`${className} col-span-12 row-span-2 w-full flex Sticky items-center border-t-2 border-l-2 border-r-2 border-red-500 rounded-t-lg p-4 overflow-hidden`}>
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
                className="flex-1 p-2 border-[1.5px] border-gray-500 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
                onClick={() => handleSend()}
                disabled={isSending}
                className={`text-white px-4 ml-2 py-2 rounded ${isSending ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
                Enviar
            </button>
        </div>
    );
}


export default InputBox;
