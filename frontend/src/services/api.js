import io from 'socket.io-client';

const socket = io(`${window.origin}`);

const sendMessage = (message, isGlobal) => {
    const token = localStorage.getItem('token'); // Asegúrate de guardar el token en el login

    if (isGlobal) {
        return new Promise((resolve, reject) => {
            socket.emit('send_pregunta', { message, token }, (response) => {
                if (response.error) {
                    reject(response.error);
                } else {
                    resolve('Mensaje enviado al chat global');
                }
            });
        });
    } else {
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
    }
};

export default sendMessage;
