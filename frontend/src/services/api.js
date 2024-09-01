import io from 'socket.io-client';

const sendMessageBot = (message) => {
    return fetch(`${window.origin}/save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
    })
        .then(response => response.json())
        .then(() => {
            return fetch(`${window.origin}/get`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            })
                .then(response => response.json())
                .then(data => data.response);
        });
};

const sendMessageChatGlobal = (message) => {
    const socket = io(`${window.origin}`);
    const token = localStorage.getItem('token'); // Asegúrate de guardar el token en el login
    return new Promise((resolve, reject) => {
        socket.emit('send_pregunta', { message, token }, (response) => {
            if (response.error) {
                reject(response.error);
            } else {
                resolve('Mensaje enviado al chat global');
            }
        });
    });
}
    
export { sendMessageBot, sendMessageChatGlobal };
