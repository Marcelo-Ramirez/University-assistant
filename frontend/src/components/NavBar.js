import React from 'react';
import { Link } from "react-router-dom";
import { useDevice } from '../context/DeviceContext';
import { useInputFocus } from '../context/InputFocusContext';

const NavBar = ({ className }) => {
    const { deviceType } = useDevice();
    const { isInputFocused } = useInputFocus();

    return (
        <nav className={`${className} ${deviceType === 'Mobile' && isInputFocused ? 'hidden' : ''} bg-gray-800 text-white`}>
            <ul className="grid grid-cols-3">
                <li>
                    <Link to="/" className="py-4 hover:bg-gray-900 hover:text-white flex items-center justify-center">Home</Link>
                </li>
                <li className="">
                    <Link to="/chat"className="py-4 hover:bg-gray-900 hover:text-white flex items-center justify-center" >Chat</Link>
                </li>
                <li>
                    <Link to="/bot" className="py-4 hover:bg-gray-900 hover:text-white flex items-center justify-center">Bot</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
