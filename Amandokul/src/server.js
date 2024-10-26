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
app.use(cors()); // Permite solicitudes CORS desde cualquier origen
app.use(express.json()); // Permite recibir datos en formato JSON

// Ruta para registrar un nuevo usuario
app.post('/api/register', (req, res) => {
  const { nombre, apellidoMaterno, apellidoPaterno, correo, contrasena, domicilio } = req.body;

  const sql = 'INSERT INTO usuarios (nombre, apellidoMaterno, apellidoPaterno, correo, contrasena, domicilio) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [nombre, apellidoMaterno, apellidoPaterno, correo, contrasena, domicilio];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al registrar usuario:', err);
      res.status(500).json({ message: 'Error al registrar usuario', error: err });
    } else {
      res.status(201).json({ message: 'Usuario registrado con éxito' });
    }
  });
});

// Ruta para iniciar sesión
app.post('/api/login', (req, res) => {
  const { correo, contrasena } = req.body;

  const sql = 'SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?';
  const values = [correo, contrasena];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error al iniciar sesión:', err);
      res.status(500).json({ message: 'Error al iniciar sesión', error: err });
    } else if (results.length > 0) {
      res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } else {
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
