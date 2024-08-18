import React, { useState, useRef, useEffect } from "react";
import Message from "./Message";
import chatbot_icon from '../assets/images/chatbot_icon.png';
import InputBox from "./InputBox";
import { useLocation } from 'react-router-dom'; //para validar segun el directorio en el que se encuentre
function Chat({ sendMessage, isMenuOpen }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showTemporaryDiv, setShowTemporaryDiv] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const location = useLocation(); // Obtiene la ubicación actual

  useEffect(() => {
    // Cambia el estado según la ruta actual
    if (location.pathname === '/bot') {
      setShowTemporaryDiv(true);
    } else {
      setShowTemporaryDiv(false);
    }
  }, [location.pathname]); // Dependencia en la ruta actual

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
                text: 'Error: No se pudo obtener respuesta del servidor',
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
      setIsSending(false);
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
    <div className="flex flex-col max-h-screen overflow-y-auto p-4 bg-gray-100">
      {showTemporaryDiv && (
        <div className="flex items-center justify-center h-40">
          <div className="flex justify-center items-center h-24 w-24 rounded-full bg-white shadow-lg">
            <img src={chatbot_icon} alt="chatbot_icon" className="h-16 w-16" />
          </div>
        </div>
      )}
      <div className="flex-1 bg-yellow-500 overflow-y-auto ">
        {messages.map((msg) => (
          <Message key={msg.id} text={msg.text} sender={msg.sender} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      {showTemporaryDiv && (
        <div className="flex flex-col space-y-2 mb-4">
          <button 
            onClick={() => handleSend("¿Cuál es tu nombre?")} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            ¿Cuál es tu nombre?
          </button>
          <button 
            onClick={() => handleSend("¿A cuanto esta la mensualidad?")} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            ¿A cuanto esta la mensualidad?
          </button>
        </div>
      )}
      <InputBox 
        CInputRef={inputRef} 
        CNewMessage={newMessage} 
        CSetNewMessage={setNewMessage} 
        CHandleSen={handleSend} 
        CIsSending={isSending} 
        isOpen={isMenuOpen} 
      />
    </div>
  );
}

export default Chat;
