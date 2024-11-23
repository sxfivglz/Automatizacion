const { validationResult } = require('express-validator');
const productService = require('../services/productService');

class ProductController {
  async getAllProducts(req, res) {
    try {
      const { success, data } = await productService.getAllProducts();
      res.status(200).json({ success, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const { success, data } = await productService.getProductById(id);
      res.status(200).json({ success, data });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async createProduct(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const product = req.body;
      const { success, message, data } = await productService.createProduct(product);
      res.status(201).json({ success, message, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async updateProduct(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const product = req.body;

      const { success, message, data } = await productService.updateProduct(id, product);
      res.status(200).json({ success, message, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const { success, message } = await productService.deleteProduct(id);
      res.status(200).json({ success, message });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new ProductController();
