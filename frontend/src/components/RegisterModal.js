import React from 'react';
import '../styles/RegisterModal.css';

const RegisterModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="register-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Registro</h2>
        {/* Aquí puedes agregar más contenido del registro */}
      </div>
    </div>
  );
};

export default RegisterModal;
