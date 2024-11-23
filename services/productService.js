const ProductRepository = require('../repositories/ProductRepository');

class ProductService {
  async getAllProducts() {
    try {
      const products = await ProductRepository.getAllProducts();
      return { success: true, data: products };
    } catch (error) {
      throw new Error(`Error al obtener los productos: ${error.message}`);
    }
  }

  async getProductById(id) {
    try {
      const product = await ProductRepository.getProductById(id);
      if (!product) {
        throw new Error(`Producto con ID ${id} no encontrado`);
      }
      return { success: true, data: product };
    } catch (error) {
      throw new Error(`Error al obtener el producto: ${error.message}`);
    }
  }

  async createProduct(product) {
    try {
      const createdProduct = await ProductRepository.createProduct(product);
      return { success: true, message: 'Producto creado exitosamente', data: createdProduct };
    } catch (error) {
      throw new Error(`Error al crear el producto: ${error.message}`);
    }
  }

  async updateProduct(id, product) {
    try {
      const updatedProduct = await ProductRepository.updateProduct(id, product);
      return { success: true, message: 'Producto actualizado exitosamente', data: updatedProduct };
    } catch (error) {
      throw new Error(`Error al actualizar el producto: ${error.message}`);
    }
  }

  async deleteProduct(id) {
    try {
      await ProductRepository.deleteProduct(id);
      return { success: true, message: 'Producto eliminado exitosamente' };
    } catch (error) {
      throw new Error(`Error al eliminar el producto: ${error.message}`);
    }
  }
}

module.exports = new ProductService();
