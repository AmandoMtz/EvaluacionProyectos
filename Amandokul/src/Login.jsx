import React, { useState } from 'react';
import './index.css';
import robotImage from './assets/robot.png';
import IdentificationUpload from './IdentificationUpload.jsx';

function Login() {
  const [loginData, setLoginData] = useState({
    correo: '',
    contrasena: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Nuevo estado para manejar el estado de sesión

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      if (response.ok) {
        alert('Inicio de sesión exitoso');
        setIsLoggedIn(true); // Cambia el estado a "iniciado sesión"
      } else {
        const errorData = await response.json();
        alert(`Error al iniciar sesión: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error de red al iniciar sesión');
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <IdentificationUpload /> // Muestra el componente de carga de identificación
      ) : (
        <div>
          <header>
            <h1>Bienvenido a Chopping</h1>
          </header>
          <div className="form-container">
            <div className="registration-form">
              <img src={robotImage} alt="Logo" />
              <h2 className="outlined-text">INICIAR SESIÓN</h2>
              <form onSubmit={handleLogin}>
                <input type="email" name="correo" placeholder="Correo Electrónico" onChange={handleChange} />
                <input type="password" name="contrasena" placeholder="Contraseña" onChange={handleChange} />
                <button type="submit">Continuar</button>
              </form>
              <p>¿No tienes una cuenta? <a href="/">Regístrate</a></p>
            </div>
          </div>
          <footer>
            © 2023-2024, Chopping, Inc. o sus afiliados
          </footer>
        </div>
      )}
    </div>
  );
}

export default Login;
