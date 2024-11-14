const { DataTypes } = require('sequelize');
const initializeDatabase = require('../config/database'); // Asegúrate de que esta ruta sea correcta
const Category = require('./Category');


const Product = async () => {
  
      const sequelize = await initializeDatabase();
  
      const Product = sequelize.define('Product', {
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
          category_fk: {
              type: DataTypes.INTEGER,
              references: {
                  model: Category,
                  key: 'id',
              },
          },
      }, {
          timestamps: false,
          tableName: 'products',
      });
  
      Product.belongsTo(Category, { foreignKey: 'category_fk' });
      Category.hasMany(Product, { foreignKey: 'category_fk' });
  
      return Product;
};

/*
const Product = sequelize.define('Product', {
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
  category_fk: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: 'id',
    },
  },
}, {
  timestamps: false,
  tableName: 'products',
});

Product.belongsTo(Category, { foreignKey: 'category_fk' });
Category.hasMany(Product, { foreignKey: 'category_fk' });

module.exports = Product;*/