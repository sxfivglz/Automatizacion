const ProductService = require('../services/productService');

class ProductController {
    async createProduct(req, res) {
        try {
        const product = await ProductService.createProduct(req.body);
        res.status(201).json(product);
        } catch (error) {
        res.status(400).json({ message: error.message });
        }
    }
    
    async getProducts(req, res) {
        try {
        const products = await ProductService.getProducts();
        res.status(200).json(products);
        } catch (error) {
        res.status(400).json({ message: error.message });
        }
    }
    
    async getProductById(req, res) {
        try {
        const product = await ProductService.getProductById(req.params.id);
        res.status(200).json(product);
        } catch (error) {
        res.status(400).json({ message: error.message });
        }
    }
    
    async updateProduct(req, res) {
        try {
        await ProductService.updateProduct(req.params.id, req.body);
        res.status(204).end();
        } catch (error) {
        res.status(400).json({ message: error.message });
        }
    }
    
    async deleteProduct(req, res) {
        try {
        await ProductService.deleteProduct(req.params.id);
        res.status(204).end();
        } catch (error) {
        res.status(400).json({ message: error.message });
        }
    }
    }

    module.exports = new ProductController();