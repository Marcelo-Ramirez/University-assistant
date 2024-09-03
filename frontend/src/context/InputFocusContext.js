// para verificar si un componente fue focus (presionado)

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Crear el contexto
const InputFocusContext = createContext();

// Proveedor del contexto
const InputFocusProvider = ({ children }) => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const inputRef = useRef(null);
    const currentLocation = useLocation();
    
    useEffect(() => {
        const handleFocus = () => setIsInputFocused(true);
        const handleBlur = () => setIsInputFocused(false);

        const inputElement = inputRef.current;
       // inputRef.current?.focus();   //por si necesitan que se haga focus 

        if (inputElement) {
            inputElement.addEventListener('focus', handleFocus);
            inputElement.addEventListener('blur', handleBlur);

            return () => {
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
