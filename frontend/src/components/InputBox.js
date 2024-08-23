import React from "react";
import { useContext } from "react";
import BotContext from "../context/BotContext";


function InputBox({className}) {
    const { setInput, input, isSendig, handleSendBot } = useContext(BotContext);
    return (
        <div className= {`${className} col-span-12 row-span-2 h-full flex bg-red-500`}>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSendBot();
                        e.preventDefault();
                    }
                }}
                placeholder={isSendig ? "Esperando respuesta..." : "Escribe un mensaje..."}
                disabled={isSendig}
                className="flex-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
                onClick={() => handleSendBot()}
                disabled={isSendig}
                className={`ml-2 px-4 py-2 text-white rounded ${isSendig ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
                Enviar
            </button>
        </div>
    );
}

export default InputBox;
