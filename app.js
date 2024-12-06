const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const {
  errorHandler,
  notFoundHandler,
  unhandledRejectionHandler,
  uncaughtExceptionHandler,
} = require('./middleware/handler');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/database');
const mysql = require('mysql2');

unhandledRejectionHandler();
uncaughtExceptionHandler();
dotenv.config();
const corsOptions = {
  //Permitir que cualquier origen acceda a la API
  origin: '*',
  //Métodos HTTP permitidos
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //Cabeceras permitidas
  allowedHeaders: 'Content-Type,Authorization',
};
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// Detectar si estamos en Docker o en el entorno local
const isDocker = process.env.DOCKER_ENV === 'true'; // Define una variable de entorno para identificar el entorno

app.get('/report', (req, res) => {
  let reportPath;

  // Si estamos en Docker, usamos la ruta interna del contenedor
  if (isDocker) {
    reportPath = path.resolve('/usr/src/app/test/Reports', 'report.html');
  } else {
    // Si estamos en el entorno local, usamos la ruta relativa a la estructura local
    reportPath = path.join(__dirname, 'test', 'Reports', 'report.html');
  }

  res.sendFile(reportPath, (err) => {
    if (err) {
      console.error('Error al servir el archivo:', err);
      res.status(500).send('Error al cargar el reporte');
    }
  });
});

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

async function createDatabaseIfNotExists() {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
  });

  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.error('Error al conectar con MySQL:', err);
        reject(err);
        return;
      }

      const createDbQuery = `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`;
      connection.query(createDbQuery, (err, result) => {
        if (err) {
          console.error('Error al crear la base de datos:', err);
          reject(err);
        } else {
          resolve();
        }
        connection.end();
      });
    });
  });
}

module.exports = app;
