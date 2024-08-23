import React, { useState } from 'react';
import user_icon from '../assets/images/user_icon.png';
import RegisterModal from './RegisterModal'; // Asegúrate de que esta importación sea correcta
import { useLocation } from "react-router-dom";

const Header = ({ className }) => {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const handleRegisterClick = () => {
        setIsRegisterModalOpen(true);
    };

    const handleCloseRegisterModal = () => {
        setIsRegisterModalOpen(false);
    };

    const location = useLocation();
    // Mapea las rutas a los nombres que quieras mostrar
    const pageTitles = {
        "/": "HOME",
        "/Lchat": "LOYOCHAT",
        "/bot": "LOYOBOT",
        // Agrega más rutas y títulos según sea necesario
    };

    // Obtén el título basado en la ruta actual
    const currentTitle = pageTitles[location.pathname] || "Loyobot"; // Título por defecto


    return (
        <header className="col-span-12 row-span-1 bg-gray-800 p-4 overflow-hidden">
            <div className="flex items-center justify-between max-w-screen-xl mx-auto">
                <div className="flex items-center">
                    {/* Aquí podrías agregar más contenido si es necesario */}
                </div>
                <div className="flex-1 text-center">
                    <h1 className="text-2xl font-bold text-white">{currentTitle}</h1>
                </div>
                <div className="flex items-center">
                    <button className="" onClick={handleRegisterClick}>
                        <img src={user_icon} alt="User icon" className="h-8 w-8" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;