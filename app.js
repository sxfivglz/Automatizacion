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
const sequelize = require('./config/database'); // Conexión con Sequelize
const mysql = require('mysql2'); // Usamos mysql2 para la creación de la base de datos

unhandledRejectionHandler();
uncaughtExceptionHandler();
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// Rutas de la API
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// Manejo de ruta no encontrada
app.use(notFoundHandler);

// Manejo de errores generales
app.use(errorHandler);

// Función para verificar y crear la base de datos si no existe
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

// Conexión a la base de datos y sincronización
(async () => {
  try {
    await createDatabaseIfNotExists(); 
    await sequelize.authenticate(); 
    console.log('Conexión establecida con la base de datos');
    
    // Sincronizamos la base de datos
    await sequelize.sync({ alter: true });

    
    // Iniciamos el servidor solo si la conexión y sincronización fueron exitosas
    app.listen(process.env.PORT_APP, () => {
      console.log(`Servidor ejecutándose en http://localhost:${process.env.PORT_APP}`);
    });
  } catch (error) {
    console.error('No se pudo conectar con la base de datos:', error);
  }
})();

module.exports = app;
