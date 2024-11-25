const app = require('./app'); 
const sequelize = require('./config/database'); 

(async () => {
  try {
    await sequelize.authenticate(); 
    console.log('Conexión establecida con la base de datos');
    
    await sequelize.sync({ alter: true });

    app.listen(process.env.PORT_APP, () => {
      console.log(`Servidor ejecutándose en http://localhost:${process.env.PORT_APP}`);
    });
  } catch (error) {
    console.error('No se pudo conectar con la base de datos:', error);
  }
})();
