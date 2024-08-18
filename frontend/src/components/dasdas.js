import React from "react";
import user_icon from "../assets/images/user_icon.png";
import chat_public_icon from "../assets/images/chat_public_icon.png";

const Header = ({ onMenuClick, onRegisterClick }) => {
  return (
    <header className="bg-gray-800 p-4 fixed w-full">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
       
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-bold text-white">Loyobot</h1>
        </div>
        <div className="flex items-center">
          <button className="p-2" onClick={onRegisterClick}>
            <img src={user_icon} alt="User icon" className="h-8 w-8" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
