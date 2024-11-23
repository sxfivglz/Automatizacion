const Product = require('../models/Product');
const Category = require('../models/Category');

class ProductRepository {
    async getAllProducts() {
        try {
            return await Product.findAll({
                include: [{
                    model: Category,
                    attributes: ['id', 'name', 'description']
                }]
            });
        } catch (error) {
            throw new Error(`Error al obtener productos: ${error.message}`);
        }
    }

    async getProductById(id) {
        try {
            const product = await Product.findByPk(id, {
                include: [{
                    model: Category,
                    attributes: ['id', 'name', 'description']
                }]
            });
            if (!product) throw new Error('Producto no encontrado');
            return product;
        } catch (error) {
            throw new Error(`Error al obtener el producto con ID ${id}: ${error.message}`);
        }
    }

    async createProduct(product) {
        try {
            return await Product.create(product);
        } catch (error) {
            throw new Error(`Error al crear el producto: ${error.message}`);
        }
    }

    async updateProduct(id, product) {
      try {
          const productFound = await Product.findByPk(id);
          if (!productFound) throw new Error('Producto no encontrado');

          const updatedProduct = {};
          for (const key in product) {
              if (product[key] !== undefined && product[key] !== null && product[key] !== '') {
                  updatedProduct[key] = product[key];
              }
          }

          if (Object.keys(updatedProduct).length === 0) {
              throw new Error('No se proporcionaron cambios para actualizar.');
          }
  
          return await productFound.update(updatedProduct);
      } catch (error) {
          throw new Error(`Error al actualizar el producto con ID ${id}: ${error.message}`);
      }
  }
  

    async deleteProduct(id) {
        try {
            const productFound = await Product.findByPk(id);
            if (!productFound) throw new Error('Producto no encontrado');
            return await productFound.destroy();
        } catch (error) {
            throw new Error(`Error al eliminar el producto con ID ${id}: ${error.message}`);
        }
    }
}

module.exports = new ProductRepository();
