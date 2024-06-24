import React, { useState, useEffect, useRef } from "react";

function InputBox({CInputRef, CNewMessage, CSetNewMessage, CHandleSen, CIsSending, IsOpen}) {
    return (
        <div className={`divider ${IsOpen ? 'open' : ''}`}>
            <input
                ref={CInputRef} //No lo tengo
                type="text"
                value={CNewMessage} //No lo tengo
                onChange={(e) => CSetNewMessage(e.target.value)} //No lo tengo
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        CHandleSen(); //No lo tengo
                        e.preventDefault(); 
                    }
                }}
                placeholder={CIsSending ? "Esperando respuesta..." : "Escribe un mensaje..."} //No lo tengo
                disabled={CIsSending} //No lo tengo
            />
            <button onClick={() => CHandleSen()} disabled={CIsSending}>Enviar</button>
        </div>
    )
}

export default InputBox;