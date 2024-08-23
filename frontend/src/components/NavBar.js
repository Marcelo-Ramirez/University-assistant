import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ className }) => {
    return (
        <nav className={`${className} bg-gray-800 text-white`}>
            <ul className="grid grid-cols-3 h-full ">
                <li className="h-full px-4 py-2 hover:bg-gray-900 hover:text-white flex items-center justify-center">
                    <Link to="/">Home</Link>
                </li>
                <li className="h-full px-4 py-2 hover:bg-gray-900 hover:text-white flex items-center justify-center">
                    <Link to="/Lchat">Chat</Link>
                </li>
                <li className="h-full px-4 py-2 hover:bg-gray-900 hover:text-white flex items-center justify-center">
                    <Link to="/bot">Bot</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
