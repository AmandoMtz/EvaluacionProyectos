import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Reemplaza con tu usuario de MySQL
  password: 'lolero22', // Reemplaza con tu contraseña de MySQL
  database: 'chopping'
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos MySQL');
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Ruta para registrar un nuevo usuario
app.post('/api/register', (req, res) => {
  const { nombre, apellidoMaterno, apellidoPaterno, correo, contrasena, domicilio } = req.body;

  const sql = 'INSERT INTO usuarios (nombre, apellidoMaterno, apellidoPaterno, correo, contrasena, domicilio) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [nombre, apellidoMaterno, apellidoPaterno, correo, contrasena, domicilio];

  db.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error al registrar usuario', error: err });
    } else {
      res.status(201).json({ message: 'Usuario registrado con éxito' });
    }
  });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
