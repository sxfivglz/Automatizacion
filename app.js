// app.js
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const {
  errorHandler,
  notFoundHandler,
  unhandledRejectionHandler,
  uncaughtExceptionHandler,
} = require('./middleware/handler');

dotenv.config();

const app = express();

// Habilita los manejadores de excepciones globales
unhandledRejectionHandler();
uncaughtExceptionHandler();

app.use(express.json());
app.use(express.static(__dirname + '/public'));

// Rutas de la API
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);


// Manejo de ruta no encontrada
app.use(notFoundHandler);

// Manejo de errores generales
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
module.exports = app;
