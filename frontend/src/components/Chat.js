import React, { useState, useRef, useEffect } from "react";
import Message from "./Message";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false); // Estado para bloquear el envío
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null); // Referencia para el campo de entrada

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim() && !isSending) {
      setIsSending(true); // Bloquea el envío de mensajes
      const userMsg = {
        id: messages.length + 1,
        text: newMessage,
        sender: "user",
      };
      setMessages([...messages, userMsg]);
      setNewMessage("");

      fetch(`${window.origin}/get`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage }),
      })
      .then(response => response.json())
      .then(data => {
        const serverMsg = {
          id: messages.length + 2,
          text: data.response,
          sender: "server",
        };
        setMessages(prevMessages => [...prevMessages, serverMsg]);
      })
      .catch((error) => {
        console.log(window.origin)
        console.error('Error:', error);
        const serverMsg = {
          id: messages.length + 2,
          text: 'Error: No se pudo obtener respuesta del servidor',
          sender: "server",
        };
        setMessages(prevMessages => [...prevMessages, serverMsg]);
      })
      .finally(() => {
        setIsSending(false); // Desbloquea el envío de mensajes
        if (inputRef.current) {
          inputRef.current.focus(); // Enfoca el campo de entrada
        }
      });
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg) => (
          <Message key={msg.id} text={msg.text} sender={msg.sender} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="divider">
        <button onClick={handleSend} disabled={isSending}>Enviar</button>
        <input
          ref={inputRef} // Asigna la referencia al campo de entrada
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
              e.preventDefault();
            }
          }}
          placeholder={isSending ? "Esperando respuesta..." : "Escribe un mensaje..."}
          disabled={isSending} // Desactiva el input si está enviando
        />
      </div> 
    </div>
  );
}

export default Chat;
