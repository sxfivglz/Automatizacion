const express = require('express');
const dotenv = require('dotenv');
const {
  errorHandler,
  notFoundHandler,
  unhandledRejectionHandler,
  uncaughtExceptionHandler,
} = require('./middleware/handler');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const sequelize = require('./config/database'); 
const mysql = require('mysql2'); 

unhandledRejectionHandler();
uncaughtExceptionHandler();
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

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

// Exporta solo la aplicación sin iniciar el servidor
module.exports = app;
