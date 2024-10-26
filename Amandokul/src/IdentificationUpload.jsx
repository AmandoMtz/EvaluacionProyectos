import React, { useState } from 'react';
import identificacionIcon from './assets/identificacion.png';
import robotImage from './assets/robot.png';
import './index.css';

function IdentificationUpload() {
  const [file, setFile] = useState(null);
  const [documentType, setDocumentType] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDocumentTypeChange = (e) => {
    setDocumentType(e.target.value);
  };

  const handleUpload = () => {
    if (file && documentType) {
      alert('Documento subido correctamente.');
    } else {
      alert('Por favor, selecciona un tipo de documento y un archivo.');
    }
  };

  return (
    <div className="form-container">
      <header className="header">
        <h1>Chopping</h1>
      </header>
      <div className="registration-form">
        <img src={robotImage} alt="Logo" className="logo" />
        <h2>Use su identificación oficial vigente</h2>
        <div className="icon-container">
          <img src={identificacionIcon} alt="Ícono de Identificación" className="identification-icon" />
        </div>
        <select className="document-select" onChange={handleDocumentTypeChange} value={documentType}>
          <option value="">Tipo de Documento</option>
          <option value="INE">INE</option>
          <option value="Pasaporte">Pasaporte</option>
          <option value="Cartilla Militar">Cartilla Militar</option>
        </select>
        <label className="upload-label">
          <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
          <span className="upload-button">Subir Archivo</span>
        </label>
        {file && <p className="file-name">{file.name}</p>}
        <button onClick={handleUpload} className="continue-button">Continuar</button>
        <p className="info-text">
          Esta información será utilizada únicamente para verificar su identidad y no será compartida con terceros.
        </p>
      </div>
      <footer className="footer">
        © 2023-2024, Chopping, Inc. o sus afiliados
      </footer>
    </div>
  );
}

export default IdentificationUpload;
