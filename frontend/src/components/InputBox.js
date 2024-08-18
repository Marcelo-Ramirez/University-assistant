import React from "react";

function InputBox({ CInputRef, CNewMessage, CSetNewMessage, CHandleSen, CIsSending, IsOpen }) {
    return (
        <div className={` w-full flex Sticky items-center bg-red-500${IsOpen ? 'bg-white shadow-md' : ''} p-4`}>
            <input
                ref={CInputRef}
                type="text"
                value={CNewMessage}
                onChange={(e) => CSetNewMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        CHandleSen();
                        e.preventDefault(); 
                    }
                }}
                placeholder={CIsSending ? "Esperando respuesta..." : "Escribe un mensaje..."}
                disabled={CIsSending}
                className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
            <button 
                onClick={() => CHandleSen()} 
                disabled={CIsSending}
                className={`ml-2 px-4 py-2 text-white rounded ${CIsSending ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
                Enviar
            </button>
        </div>
    );
}

export default InputBox;
