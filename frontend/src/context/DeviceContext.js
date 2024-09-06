import React, { createContext, useContext, useEffect, useState } from 'react';
//verificar si el navegador o lo q abre sea mobile o pc 
// Crear el contexto
const DeviceContext = createContext();

// Proveedor del contexto
const DeviceProvider = ({ children }) => {
    const [deviceType, setDeviceType] = useState('PC');

    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
        // Detectar dispositivos móviles y PC
        if (/android/i.test(userAgent) || 
            (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) || 
            (/Windows/.test(userAgent) && 'ontouchstart' in window)) {
            setDeviceType('Mobile');
        } else {
            setDeviceType('PC');
        }
    }, []); 
    
    const data = { deviceType };

    return (
        <DeviceContext.Provider value={data}>
            {children}
        </DeviceContext.Provider>
    );
};

// Hook para usar el contexto
const useDevice = () => useContext(DeviceContext);

export { DeviceProvider, useDevice };
export default DeviceContext;