import React, { useContext } from 'react';
import user_icon from '../assets/images/user_icon.png';
import RegisterModal from './RegisterModal'; // Asegúrate de que esta importación sea correcta
import { useLocation } from "react-router-dom";
import ModalContext from '../context/ModalContext';

const Header = ({ className }) => {
    const { isRegisterModalOpen, setIsRegisterModalOpen, setIsLoged } = useContext(ModalContext);

    const handleRegisterClick = () => {
        console.log('Register button clicked');
        setIsLoged(false);
        setIsRegisterModalOpen(true);
    };

    const handleCloseRegisterModal = () => {
        setIsRegisterModalOpen(false);
    };

    const location = useLocation();
    // Mapea las rutas a los nombres que quieras mostrar
    const pageTitles = {
        "/": "HOME",
        "/Chat": "LOYOCHAT",
        "/bot": "LOYOBOT",
    };

    // Obtén el título basado en la ruta actual
    const currentTitle = pageTitles[location.pathname] || "LoyoApp"; // Título por defecto


    return (
        <header className={`${className} h-full bg-gray-800 overflow-hidden flex items-center justify-center relative`}>
            <div className="absolute left-4">
                {/* Si tienes algún contenido adicional en la parte izquierda */}
            </div>

            {/* Título siempre centrado */}
            <div className="text-center">
                <h1 className="text-2xl font-bold text-white">{currentTitle}</h1>
            </div>

            {/* Ícono de usuario posicionado al final con margen derecho */}
            <div className="absolute right-4">
                <button onClick={handleRegisterClick}>
                    <img src={user_icon} alt="User icon" className="h-8 w-8" />
                </button>
            </div>

            {isRegisterModalOpen && (
                <RegisterModal onClose={handleCloseRegisterModal} />
            )}
        </header>

    );
};

export default Header;