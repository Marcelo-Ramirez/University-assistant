import React, { useState } from 'react';

const SCMWindow = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleWindow = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button onClick={toggleWindow}>Abrir ventana emergente</button>
            {isOpen && (
                <div className="popup">
                    <h2>Ventana emergente</h2>
                    <p>Contenido de la ventana emergente...</p>
                    <button onClick={toggleWindow}>Cerrar</button>
                </div>
            )}
        </div>
    );
};

export default SCMWindow;