import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white">
            <nav>
                <ul className="flex justify-around p-4">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/chat">Chat</Link>
                    </li>
                    <li>
                        <Link to="/bot">Bot</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default NavBar;
