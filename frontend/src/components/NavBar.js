import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white">
      <nav>
        <ul className="flex justify-around w-full h-full">
        <li className="flex-grow h-full">
                <Link to="/" className="h-full px-4 py-2 hover:bg-gray-900 hover:text-white flex items-center justify-center">Home</Link>
            </li>
            <li className="flex-grow h-full">
                <Link to="/Lchat" className="h-full px-4 py-2 hover:bg-gray-900 hover:text-white flex items-center justify-center">Chat</Link>
            </li>
            <li className="flex-grow h-full">
                <Link to="/bot" className="h-full px-4 py-2 hover:bg-gray-900 hover:text-white flex items-center justify-center">Bot</Link>
            </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
