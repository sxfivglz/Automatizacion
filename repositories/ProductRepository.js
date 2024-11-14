const Product = require('../models/Product');

class ProductRepository {
  async getAllProducts() {
    return await Product.findAll({ incluide: 'Category' });
  }

  async getProductById(id) {
    return await Product.findByPk(id, { include: 'Category' });
  }
    async getProductsByCategory(categoryId) {
    return await Product.findAll({ where: { category_fk: categoryId }, include: 'Category' });
  }

  async createProduct(product) {
    return await Product.create(product, { include: 'Category' });
  }

  async updateProduct(id, product) {
    const productFound = await Product.findByPk(id);
    if (!product) throw new Error('No se encontró el producto');
    return await product.update(product);
  }

  async deleteProduct(id) {
    const productFound = await Product.findByPk(id);
    if (!product) throw new Error('No se encontró el producto');
    return await product.destroy();
  }


}

module.exports = new ProductRepository();