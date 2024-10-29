// models/Category.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database').sequelize;

class Category extends Model {}

Category.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: 'Category' }
);

module.exports = Category;
