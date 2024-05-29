import React from "react";
import "../styles/Header.css";
import user_icon from "../assets/user_icon.png";
import chat_public_icon from "../assets/chat_public_icon.png";

const Header = ({ onMenuClick, onRegisterClick }) => {
  return (
    <header className="App-header">
      <div className="header-container">
        <div className="header-element menu-button-container">
          <button className="menu-button" onClick={onMenuClick}>
            <img src={chat_public_icon} alt="Chat icon" className="logochat" />
          </button>
        </div>
        <div className="title-container">
          <h1 className="header-title">Loyobot</h1>
        </div>
        <div className="header-element register-button-container">
          <button className="register-button" onClick={onRegisterClick}>
            <img src={user_icon} alt="User icon" className="logochat" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
