// server.js
const app = require('./app');
const db = require('./config/database');
const { Product, Category } = require('./models/CategoryProduct'); 
const { unhandledRejectionHandler, uncaughtExceptionHandler } = require('./handler');

unhandledRejectionHandler();
uncaughtExceptionHandler();

db.connect()
    .then(() => {
        // Sincroniza los modelos con la base de datos
        return sequelize.sync();  // Sincroniza todos los modelos y crea las tablas si no existen
    })
    .then(() => {
        app.listen(3000, () => {
            console.log('Servidor ejecutándose en http://localhost:3000');
        });
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1); // Finalizar el proceso si la conexión falla
    });
