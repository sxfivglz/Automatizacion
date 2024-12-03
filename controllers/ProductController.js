const productService = require('../services/productService');

class ProductController {
  async getAllProducts(req, res) {
    try {
      const products = await productService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createProduct(req, res) {
    try {
      const product = req.body;
      const newProduct = await productService.createProduct(product);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const product = req.body;
      const updatedProduct = await productService.updateProduct(id, product);
      res.status(200).json(updatedProduct);
    } catch (error) {
      if (error.message === 'No se encontró el producto') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      await productService.deleteProduct(id);
      res.status(204).end();
    } catch (error) {
      if (error.message === 'No se encontró el producto') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  }
}

module.exports = new ProductController();
