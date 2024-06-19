const getMessages = () => {
    return fetch(`${window.origin}/getMessages`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`  // Asumiendo que guardaste el token en localStorage
        }
    })
    .then(response => response.json())
    .then(data => {
        return data.messages;  // Asumiendo que el servidor retorna un objeto con una clave "messages"
    })
    .catch(error => {
        console.error('Error al obtener mensajes:', error);
        throw error;
    });
};

export default getMessages;
