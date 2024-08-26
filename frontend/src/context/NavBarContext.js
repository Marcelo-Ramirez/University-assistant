// NavBarContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDevice } from './DeviceContext';
import { useInputFocus } from './InputFocusContext';

const NavBarContext = createContext();

const NavBarProvider = ({ children }) => {
    const { deviceType } = useDevice();
    const { isInputFocused } = useInputFocus();
    const [isNavBarVisible, setIsNavBarVisible] = useState(true);

    useEffect(() => {
        // Actualizar la visibilidad del NavBar según el tipo de dispositivo y el estado de enfoque
        if (deviceType === 'Mobile' && isInputFocused) {
            setIsNavBarVisible(false);
            alert("esta");
        } else {
            setIsNavBarVisible(true);
            alert("si esta");
        }
    }, [deviceType, isInputFocused]); // Dependencias para actualizar el estado

    return (
        <NavBarContext.Provider value={{ isNavBarVisible }}>
            {children}
        </NavBarContext.Provider>
    );
};

const useNavBar = () => useContext(NavBarContext);

export { NavBarProvider, useNavBar };
