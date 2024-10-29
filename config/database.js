const { Sequelize } = require('sequelize');
require('dotenv').config();

class Database {
  constructor() {
    if (!Database.instance) {
      this.sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASS, // Cambia este nombre de variable si es necesario
        {
          host: process.env.DB_HOST,
          port: process.env.DB_PORT, // El puerto se debe pasar aquí
          dialect: 'mysql',
        }
      );
      Database.instance = this;
    }
    return Database.instance;
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log('Conexión a la base de datos exitosa.');
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
    }
  }
}

const instance = new Database();
Object.freeze(instance);
module.exports = instance;
