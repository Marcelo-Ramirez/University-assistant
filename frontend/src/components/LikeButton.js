import { io } from "socket.io-client";

// Conexión al socket
const socket = io(window.origin);

// Función para obtener el contador de likes
export const getLikeCount = (id, setLikeCount) => {
    socket.emit("get_like_count", id);

    const handleLikeCountResponse = ({ preguntas_id, total_likes }) => {
        if (preguntas_id === id) {
            setLikeCount(total_likes);
        }
    };

    socket.on("like_count_response", handleLikeCountResponse);

    return () => {
        socket.off("like_count_response", handleLikeCountResponse);
    };
};

// Función para obtener el estado de like del usuario
export const checkUserLikeStatus = (id, setHasLiked) => {
    const token = localStorage.getItem('token');

    if (token) {
        socket.emit("check_user_like", { messageId: id, token });
    }

    const handleUserLikeStatus = ({ preguntas_id, has_liked }) => {
        if (preguntas_id === id) {
            setHasLiked(has_liked);
        }
    };

    socket.on("user_like_status", handleUserLikeStatus);

    return () => {
        socket.off("user_like_status", handleUserLikeStatus);
    };
};

// Función para manejar el clic en el botón de like
export const handleLikeClick = (id, username, hasLiked, setLikeCount, setHasLiked) => {
    const token = localStorage.getItem('token');

    socket.emit("like_pregunta", { messageId: id, username, token });

    // Actualizar el estado local de likes
    setLikeCount(prevCount => hasLiked ? prevCount - 1 : prevCount + 1);
    setHasLiked(prevState => !prevState);
};
