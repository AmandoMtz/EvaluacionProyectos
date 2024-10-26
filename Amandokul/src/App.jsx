import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import robotImage from './assets/robot.png';
import Login from './Login.jsx';


function Registration() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidoMaterno: '',
    apellidoPaterno: '',
    correo: '',
    contrasena: '',
    domicilio: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Usuario registrado con éxito');
      } else {
        const errorData = await response.json();
        alert(`Error al registrar usuario: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Error de red al registrar usuario');
    }
  };

  return (
    <div>
      <header>
        <h1>Bienvenido a Chopping</h1>
      </header>
      <div className="form-container">
        <div className="registration-form">
          <img src={robotImage} alt="Logo" />
          <h2 className="outlined-text">CREAR CUENTA</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} />
            <input type="text" name="apellidoMaterno" placeholder="Apellido Materno" onChange={handleChange} />
            <input type="text" name="apellidoPaterno" placeholder="Apellido Paterno" onChange={handleChange} />
            <input type="email" name="correo" placeholder="Correo Electrónico" onChange={handleChange} />
            <input type="password" name="contrasena" placeholder="Contraseña" onChange={handleChange} />
            <input type="text" name="domicilio" placeholder="Domicilio" onChange={handleChange} />
            <button type="submit">Continuar</button>
          </form>
          <p>Al crear una cuenta, aceptas las <a href="#">Condiciones de Uso</a> y el <a href="#">Aviso de Privacidad</a> de Chopping.</p>
          <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p>
        </div>
      </div>
      <footer>
        © 2023-2024, Chopping, Inc. o sus afiliados
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
