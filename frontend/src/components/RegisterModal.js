import React, { useState} from "react";
import "../styles/RegisterModal.css";

const RegisterModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [carrera, setCarrera] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const carreras = [
    "Adm. Empresas",
    "Ing. Comercial",
    "Ing. Financiera",
    "Derecho",
    "Comunicación",
    "Ing. Civil",
    "Ing. Industrial",
    "Ing. Sistemas",
    "Ing. Mecánica",
    "Ing. Electrónica",
    "Ing. Ambiental",
    "Gastronomía",
    "Veterinaria",
  ];
 //funcion para limpiar campos
 const clearInputs = () => {
  setUsername("");
  setPassword("");
  setCarrera("");
};



  if (!isOpen) return null;

  const handleRegister = async () => {
    const response = await fetch(`${window.origin}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, carrera }),
    });

    if (response.ok) {
      alert("Usuario registrado correctamente");
      //llimpiado de los campos
      clearInputs();
      onClose();
    } else {
      alert("Error al registrar el usuario");
      //limpiado de los campos
      clearInputs();
    }
  };

  const handleLogin = async () => {
    const response = await fetch(`${window.origin}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.access_token);
      alert("Logeo exitoso");
      //limpiado de los campos
      clearInputs();
      onClose();
    } else {
      alert("El usuario ya existe o la contraseña es incorrecta");
      //limpiado de los campos
      clearInputs();
    }
  };

  return (
    <div className="register-modal">
      <div className="modal-content">
      <button
          className="close-button"
          onClick={() => {
            onClose();
            // la función clearInputs aquí para limpiar los campos cuando se cierra el modal
            clearInputs();
          }}
        >
          ×
        </button>
        <h2>{isLogin ? "Iniciar Sesión" : "Registro"}</h2>
        <input
          type="text"
          placeholder="Nombre de Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {!isLogin && (
          <select
            value={carrera}
            onChange={(e) => setCarrera(e.target.value)}
            style={{
              width: "100%",
              padding: "15px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "16px",
              backgroundColor: "#f9f9f9",
              color: "#333",
            }}
          >
            <option value="" disabled>
              Selecciona tu carrera
            </option>
            {carreras.map((carrera, index) => (
              <option key={index} value={carrera}>
                {carrera}
              </option>
            ))}
          </select>
        )}
        <input
          type="password"
          placeholder="Codigo Universitario"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={isLogin ? handleLogin : handleRegister} 
          className="p-custom text-black pt-3 pr-4 pb-3 pl-4 rounded hover:bg-blue-600">
          {isLogin ? "Iniciar Sesión" : "Registrarse"}
        </button>
        <button
        
          onClick={() => {
            setIsLogin(!isLogin);
            clearInputs();
          }}
          className="p-custom text-black pt-3 pr-4 pb-3 pl-4 rounded hover:bg-blue-600"
        >
          {isLogin
            ? "¿No tienes cuenta? Regístrate"
            : "¿Ya tienes cuenta? Inicia Sesión"}
        </button>
      </div>
    </div>
  );
};

export default RegisterModal;
