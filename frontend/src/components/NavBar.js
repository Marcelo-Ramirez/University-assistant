import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ className }) => {
    return (
        <nav className={`${className} bg-gray-800 text-white h-full`}>
            <ul className="grid grid-cols-3 h-full">
                <li className="">
                    <Link to="/" className="h-full py-4 hover:bg-gray-900 hover:text-white flex items-center justify-center">Home</Link>
                </li>
                <li className="">
                    <Link to="/chat"className="h-full py-4 hover:bg-gray-900 hover:text-white flex items-center justify-center" >Chat</Link>
                </li>
                <li className="">
                    <Link to="/bot" className="h-full py-4 hover:bg-gray-900 hover:text-white flex items-center justify-center">Bot</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
