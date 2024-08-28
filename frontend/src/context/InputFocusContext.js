// para verificar si un componente fue focus (presionado)

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Crear el contexto
const InputFocusContext = createContext();

// Proveedor del contexto
const InputFocusProvider = ({ children }) => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        const handleFocus = () => { 
            console.log('focus');
            setIsInputFocused(true) };
        const handleBlur = () => setIsInputFocused(false);

        const inputElement = inputRef.current;
        
        if (inputElement) {
            console.log('inputElement:', inputElement);
            console.log('location:', location.pathname);
            inputElement.addEventListener('focus', handleFocus);
            inputElement.addEventListener('blur', handleBlur);

            return () => {
                console.log("Desmontando")
                inputElement.removeEventListener('focus', handleFocus);
                inputElement.removeEventListener('blur', handleBlur);
            };
        }
    }, [currentLocation.pathname]); // Ejecuta el efecto cuando cambia la ruta

    return (
        <InputFocusContext.Provider value={{ isInputFocused, inputRef }}>
            {children}
        </InputFocusContext.Provider>
    );
};

// Hook para usar el contexto
const useInputFocus = () => useContext(InputFocusContext);

export { InputFocusProvider, useInputFocus };
export default InputFocusContext;
