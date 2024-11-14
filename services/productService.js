const ProductRepository = require('../repositories/ProductRepository');

class ProductService {
  async getAllProducts() {
    return await ProductRepository.allProducts();
  }

  async getProductsByCategory(categoryId) {
    return await ProductRepository.getProductsByCategory(categoryId);
  }

  async getProductById(id) {
    return await ProductRepository.getProductById(id);
  }

  async createProduct(product) {
    return await ProductRepository.createProduct(product);
  }

  async updateProduct(id, product) {
    return await ProductRepository.updateProduct(id, product);
  }

  async deleteProduct(id) {
    return await ProductRepository.deleteProduct(id);
  }
}

module.exports = new ProductService();
