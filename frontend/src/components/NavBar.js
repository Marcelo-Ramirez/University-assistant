import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ className }) => {
    return (
        <nav className={`${className} bg-gray-800 text-white`}>
            <ul className="flex justify-around w-full h-full">
                <li className="flex-grow h-full">
                    <Link to="/" className="h-full px-4 py-2 hover:bg-gray-900 hover:text-white flex items-center justify-center">Home</Link>
                </li>
                <li className="flex-grow h-full">
                    <Link to="/chat" className="h-full px-4 py-2 hover:bg-gray-900 hover:text-white flex items-center justify-center">Chat</Link>
                </li>
                <li className="flex-grow h-full">
                    <Link to="/bot" className="h-full px-4 py-2 hover:bg-gray-900 hover:text-white flex items-center justify-center">Bot</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
