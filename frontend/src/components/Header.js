import React, { useState } from 'react';
import user_icon from '../assets/images/user_icon.png';
import RegisterModal from './RegisterModal'; // Asegúrate de que esta importación sea correcta

const Header = () => {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const handleRegisterClick = () => {
        setIsRegisterModalOpen(true);
    };

    const handleCloseRegisterModal = () => {
        setIsRegisterModalOpen(false);
    };

    return (
        <>
            <header className="bg-gray-800 p-4 w-full fixed ">
                <div className="flex items-center justify-between max-w-screen-xl mx-auto">
                    <div className="flex items-center">
                        {/* Aquí podrías agregar más contenido si es necesario */}
                    </div>
                    <div className="flex-1 text-center">
                        <h1 className="text-2xl font-bold text-white">Loyobot</h1>
                    </div>
                    <div className="flex items-center">
                        <button className="p-2" onClick={handleRegisterClick}>
                            <img src={user_icon} alt="User icon" className="h-8 w-8" />
                        </button>
                    </div>
                </div>
            </header>
            <RegisterModal 
                isOpen={isRegisterModalOpen} 
                onClose={handleCloseRegisterModal} 
            />
        </>
    );
};

export default Header;