import React, { useEffect, useRef } from "react";
import chatbot_icon from '../assets/images/chatbot_icon.png';
import user_icon from '../assets/images/user_icon.png';
import { useLocation } from "react-router-dom"; // Importar useLocation

function SCMessage({ text, sender }) {
    const isUser = sender === 'user';
    const icon = isUser
        ? <img src={user_icon} alt="User Icon" className="h-8 w-8 rounded-full" />
        : <img src={chatbot_icon} alt="Chatbot Icon" className=
            "h-8 w-8 rounded-full" />;
    const { username, carrera, fecha } = sender;

    // PARA OBTENER LA HORA EN QUE SE ENVIO EL MENSAJE
    const fechaActual = new Date();
    const fechaActualUTC = fechaActual.toUTCString(); // Fecha en formato UTC
console.log(fechaActualUTC); // Ejemplo: "Fri, 06 Sep 2024 14:35:40 GMT"

    const fechaComentario = fecha;

    // Convertir la fecha del comentario a un objeto Date
    const fechaComentarioDate = new Date(fechaComentario);

    // Calcular la diferencia en milisegundos
    const diferenciaTiempo = fechaActual - fechaComentarioDate;

    // Convertir la diferencia de tiempo a unidades legibles
    const segundos = Math.floor(diferenciaTiempo / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const días = Math.floor(horas / 24);
    const semanas = Math.floor(días / 7);
    const meses = Math.floor(días / 30);
    const años = Math.floor(días / 365);

    // Función para obtener el tiempo transcurrido
    function obtenerTiempoTranscurrido() {
        if (años > 0) {
            return ` hace ${años} año${años > 1 ? 's' : ''}`;
        } else if (meses > 0) {
            return ` hace ${meses} mes${meses > 1 ? 'es' : ''}`;
        } else if (semanas > 0) {
            return ` hace ${semanas} semana${semanas > 1 ? 's' : ''}`;
        } else if (días > 0) {
            return ` hace ${días} día${días > 1 ? 's' : ''}`;
        } else if (horas > 0) {
            return ` hace ${horas} hora${horas > 1 ? 's' : ''}`;
        } else if (minutos > 0) {
            return ` hace ${minutos} minuto${minutos > 1 ? 's' : ''}`;
        } else {
            return ` hace ${segundos} segundo${segundos > 1 ? 's' : ''}`;
        }
    }
    //// FIN DE LA FUNCION
  // Hook para detectar cambios de ruta y obtener la hora actual
  const location = useLocation();
  useEffect(() => {
      const currentTime = new Date().toLocaleTimeString();
      console.log(`La ruta ha cambiado. Hora actual: ${currentTime}`);
  }, [location]); // Se ejecuta cada vez que cambia la ruta


    return (
        <div className={`flex flex-col mb-4 ${isUser ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'} rounded-lg`}>
            <div className="flex items-center mb-2">
                {icon}
                <div className="ml-2">
                    <span className="font-semibold text-sm">{username}</span>
                    <span className="text-xs text-gray-500">{
                        obtenerTiempoTranscurrido()
                    }</span>
                    <span className="block text-xs text-gray-500">{carrera}</span>
                    
                </div>
            </div>
            <p className="text-sm">{text}</p>
        </div>
    );
}

export default SCMessage;
