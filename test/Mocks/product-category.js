const SequelizeMock = require('sequelize-mock');

const DBConnectionMock = new SequelizeMock();

const ProductMock = DBConnectionMock.define('Product', {
  id: 1,
  name: 'Laptop',
  price: 1200.0,
  stock: 50,
  categoryId: 1,
});

// Definir las funciones necesarias directamente en el modelo
ProductMock.findAll = jest.fn();
ProductMock.findByPk = jest.fn();
ProductMock.create = jest.fn();
ProductMock.update = jest.fn(); // Aquí lo defines directamente como método del modelo
ProductMock.destroy = jest.fn(); // Igual que update

// Mock para Category, si lo necesitas
const CategoryMock = DBConnectionMock.define('Category', {
  id: 1,
  name: 'Electronics',
  description: 'Electronic devices',
});

CategoryMock.findAll = jest.fn();
CategoryMock.findByPk = jest.fn();
CategoryMock.create = jest.fn();
CategoryMock.update = jest.fn();
CategoryMock.destroy = jest.fn();

// Exportar los mocks
module.exports = { ProductMock, CategoryMock };
