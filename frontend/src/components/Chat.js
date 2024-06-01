import React, { useState, useRef, useEffect } from "react";
import Message from "./Message";
import chatbot_icon from '../assets/chatbot_icon.png';

function Chat({ sendMessage, isMenuOpen }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showTemporaryDiv, setShowTemporaryDiv] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (messageFast) => {

    if (newMessage !== "") {
      if (newMessage.trim() && !isSending) {
        setIsSending(true);
        if (!isMenuOpen) {
          const userMsg = {
            id: messages.length + 1,
            text: newMessage,
            sender: "user",
          };
          setMessages([...messages, userMsg]);
        }
        setNewMessage("");





        if (!isMenuOpen) {
          setShowTemporaryDiv(false); // Oculta el div temporal
        }

        sendMessage(newMessage, isMenuOpen)
          .then((serverResponse) => {
            if (!isMenuOpen) {
              const serverMsg = {
                id: messages.length + 2,
                text: serverResponse,
                sender: "server",
              };
              setMessages(prevMessages => [...prevMessages, serverMsg]);
            }
          })
          .catch((error) => {
            console.error('Error:', error);
            if (!isMenuOpen) {
              const serverMsg = {
                id: messages.length + 2,
                text: 'Error: No se pudo obtener respuesta del servidor dfsdfadfsdfassdafdsdfasdfasdfa',
                sender: "server",
              };
              setMessages(prevMessages => [...prevMessages, serverMsg]);
            }
          })
          .finally(() => {
            setIsSending(false);
            inputRef.current?.focus();
          });
      }
    }
    if (messageFast) {
      const userMsg = {
        id: messages.length + 1,
        text: messageFast,
        sender: "user",
      };
      setMessages([...messages, userMsg]);
      if (!isMenuOpen) {
        setShowTemporaryDiv(false); // Oculta el div temporal
      }


      sendMessage(messageFast, isMenuOpen)
        .then((serverResponse) => {
          if (!isMenuOpen) {
            const serverMsg = {
              id: messages.length + 2,
              text: serverResponse,
              sender: "server",
            };
            setMessages(prevMessages => [...prevMessages, serverMsg]);
          }
        })
        .catch((error) => {
          if (!isMenuOpen) {
            const serverMsg = {
              id: messages.length + 2,
              text: 'Error: No se pudo obtener respuesta del servidor',
              sender: "server",
            };
            setMessages(prevMessages => [...prevMessages, serverMsg]);
          }
        })
        .finally(() => {
          setIsSending(false);
        })
    }
  };
  return (
    <div className="chat-container">
      {showTemporaryDiv && (
        <div className="temporary-div">
          <div className="escudo-container">
            <img src={chatbot_icon} alt="chatbot_icon" className="chatbot_icon" />
          </div>
        </div>
      )}
      <div className="messages">
        {messages.map((msg) => (
          <Message key={msg.id} text={msg.text} sender={msg.sender} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      {showTemporaryDiv && (
        <div className="predefined-questions">
          <button onClick={() => handleSend("¿Cuál es tu nombre")}>¿Cuál es tu nombre?</button>
          <button onClick={() => handleSend("¿A cuanto esta la mensualidad?")}>¿A cuanto esta la mensualidad?</button>
        </div>
      )}
      <div className="divider">
        <input
          ref={inputRef}
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
          disabled={isSending}
        />
        <button onClick={() => handleSend()} disabled={isSending}>Enviar</button>
      </div>
    </div>
  );
}

export default Chat;
