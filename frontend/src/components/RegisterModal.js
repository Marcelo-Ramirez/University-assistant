import React, { useState } from 'react';
import '../styles/RegisterModal.css';

const RegisterModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleRegister = async () => {
    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      alert('User registered successfully');
      onClose();
    } else {
      alert('Error registering user');
    }
  };

  return (
    <div className="register-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Registro</h2>
        <input
          type="text"
          placeholder="Nombre de Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Registrarse</button>
      </div>
    </div>
  );
};

export default RegisterModal;
