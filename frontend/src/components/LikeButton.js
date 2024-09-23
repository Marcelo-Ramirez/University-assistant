import React, { useState, useEffect } from 'react';

const LikeButton = ({ id, username, initialLikes }) => {
    // Estado para saber si el usuario ya ha dado like
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(initialLikes); // Estado para el conteo de likes

    const handleClick = async () => {
        console.log('Botón presionado. Estado actual:', liked);

        // Determina la cantidad a enviar según el estado actual
        const newQuantity = liked ? -1 : 1; // Si ya le dieron like, disminuir; de lo contrario, aumentar.

        console.log('Cantidad a enviar:', newQuantity);

        try {
            const response = await fetch(`${window.origin}/api/likes`, { // Usar window.origin para la URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idpregunta: id,
                    usuario: username,
                }),
            });

            if (!response.ok) {
                throw new Error('Error al guardar el like');
            }

            const data = await response.json();
            console.log('Like guardado:', data);

            // Cambia el estado del like
            setLiked(!liked); // Alterna el estado de liked
            const updatedLikesCount = likesCount + newQuantity; // Actualiza el conteo de likes
            setLikesCount(updatedLikesCount); // Incrementa o decrementa el conteo

            console.log('Nuevo estado de liked:', !liked);
            console.log('Total de likes:', updatedLikesCount);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        console.log('Estado de liked cambiado a:', liked);
    }, [liked]);

    useEffect(() => {
        console.log('Total de likes actualizado a:', likesCount);
    }, [likesCount]);

    return (
        <button onClick={handleClick} className="flex items-center">
            <span className={`mr-1 ${liked ? 'text-blue-500' : 'text-gray-500'}`}>
                {liked ? '👎' : '👍'} {/* Cambiar ícono según el estado */}
            </span>
            {liked ? 'Dislike' : 'Like'} ({likesCount}) {/* Mostrar el conteo de likes */}
        </button>
    );
};
