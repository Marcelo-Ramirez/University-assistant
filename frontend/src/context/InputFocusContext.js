// para verificar si un componente fue focus (presionado)
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

// Crear el contexto
const InputFocusContext = createContext();

// Proveedor del contexto
const InputFocusProvider = ({ children }) => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        const handleFocus = () => setIsInputFocused(true);
        const handleBlur = () => setIsInputFocused(false);

        const inputElement = inputRef.current;

        if (inputElement) {
            inputElement.addEventListener('focus', handleFocus);
            inputElement.addEventListener('blur', handleBlur);

            return () => {
                inputElement.removeEventListener('focus', handleFocus);
                inputElement.removeEventListener('blur', handleBlur);
            };
        }
    }, []);

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
