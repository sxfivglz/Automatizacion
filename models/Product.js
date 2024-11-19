const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./Category');

class Product extends Model {}

Product.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: Category,
        key: 'id',
        },
    },
    }, {
    sequelize,
    modelName: 'product',
    timestamps: false,
    });

    Product.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Product, { foreignKey: 'categoryId' });
module.exports = Product;
