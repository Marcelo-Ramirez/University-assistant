import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import SCMessage from './SCMessage';

function SlidingChat() {
  const [messages, setMessages] = useState([
    { message: 'Hola a todos, ¿cómo están?', username: 'Juan Perez', carrera: 'Electronica' },
    { message: 'Hola Juan, todo bien. ¿Y tú?', username: 'Maria Lopez', carrera: 'Sistemas' },
    { message: 'Hola Maria, estoy bien, gracias. ¿Qué tal tus estudios?', username: 'Juan Perez', carrera: 'Electronica' },
    { message: 'Un poco estresada con los exámenes, pero sobreviviendo.', username: 'Maria Lopez', carrera: 'Sistemas' },
    { message: '¿Alguien ha visto las notas del último examen?', username: 'Carlos Martinez', carrera: 'Industrial' },
    { message: 'Sí, salieron hoy en la mañana.', username: 'Ana Gomez', carrera: 'Sistemas' },
    { message: '¡Genial! Tengo que revisarlas. ¿Qué tal te fue, Ana?', username: 'Luis Rodriguez', carrera: 'Telecomunicaciones' },
    { message: 'Me fue bien, aunque podría haberlo hecho mejor.', username: 'Ana Gomez', carrera: 'Sistemas' },
    { message: 'Yo todavía no reviso mis notas. Tengo miedo de verlas.', username: 'Carmen Hernandez', carrera: 'Civil' },
    { message: '¡Ánimo, Carmen! Seguro te fue bien.', username: 'Pedro Garcia', carrera: 'Mecatronica' },
    { message: 'Gracias, Pedro. ¿Y tú, cómo vas con los proyectos?', username: 'Carmen Hernandez', carrera: 'Civil' },
    { message: 'Bien, aunque uno de los proyectos está siendo un dolor de cabeza.', username: 'Pedro Garcia', carrera: 'Mecatronica' },
    { message: '¿Necesitas ayuda con algo? Podríamos hacer una sesión de estudio grupal.', username: 'Elena Sanchez', carrera: 'Biomedica' },
    { message: 'Eso sería genial, gracias Elena.', username: 'Pedro Garcia', carrera: 'Mecatronica' },
    { message: '¿Podríamos hacer la sesión el fin de semana?', username: 'Miguel Torres', carrera: 'Mecánica' },
    { message: 'Por mí está bien. ¿Qué opinan los demás?', username: 'Lucia Rivera', carrera: 'Ambiental' },
    { message: 'Sí, el fin de semana me viene perfecto.', username: 'Roberto Ruiz', carrera: 'Sistemas' },
    { message: 'Entonces, ¡sesión de estudio el sábado!', username: 'Sofia Morales', carrera: 'Electronica' },
    { message: 'Perfecto, nos vemos el sábado.', username: 'Fernando Diaz', carrera: 'Sistemas' },
    { message: 'No olviden llevar sus apuntes.', username: 'Isabel Chavez', carrera: 'Industrial' },
    { message: 'Y sus dudas, para que podamos resolver todo.', username: 'Andres Gomez', carrera: 'Telecomunicaciones' },
    { message: '¡Gracias a todos! Nos vemos el sábado.', username: 'Valeria Ramos', carrera: 'Civil' },
    { message: 'Hasta el sábado, ¡no falten!', username: 'Diego Romero', carrera: 'Mecatronica' },
    { message: 'Nos vemos, cuídense.', username: 'Laura Herrera', carrera: 'Biomedica' },
    { message: '¡Hasta pronto!', username: 'Jorge Alvarez', carrera: 'Mecánica' },
    { message: 'Adiós, nos vemos.', username: 'Monica Fernandez', carrera: 'Ambiental' }
  ]);

  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const newSocket = io(`${window.origin}`);
    setSocket(newSocket);

    // Escuchar preguntas iniciales
    newSocket.on('initial_preguntas', (data) => {
      setMessages(data.messages);
      scrollToBottom(); // Desplazarse al final cuando se cargan las preguntas iniciales
    });

    // Escuchar nuevas preguntas
    newSocket.on('new_pregunta', (pregunta) => {
      setMessages((prevMessages) => [...prevMessages, pregunta]);
      scrollToBottom(); // Desplazarse al final cuando llega una nueva pregunta
    });

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex-1 overflow-y-auto bg-blue-500 ">
        {messages.map((msg, index) => (
          <SCMessage key={index} text={msg.message} sender={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>
  );
}

export default SlidingChat;