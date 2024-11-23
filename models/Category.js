const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');


class Category extends Model {}

Category.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize,
    timestamps: false,
    tableName: 'categories',
});

module.exports = Category;

