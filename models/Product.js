// models/Product.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database').sequelize;

class Product extends Model {}

Product.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
    stock: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: 'Product' }
);

module.exports = Product;
