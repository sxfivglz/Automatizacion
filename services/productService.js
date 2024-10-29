// services/productService.js
const { Product } = require('../models/Product');
const { Category } = require('../models/Category');
const { CategoryProduct } = require('../models/CategoryProduct');


class ProductService {
  async createProduct(product) {
    return await Product.create(product);
  }

  async getProducts() {
    return await Product.findAll();
  }

  async getProductById(id) {
    return await Product.findByPk(id);
  }

  async updateProduct(id, product) {
    return await Product.update(product, { where: { id } });
  }

  async deleteProduct(id) {
    return await Product.destroy({ where: { id } });
  }
}

module.exports = new ProductService();