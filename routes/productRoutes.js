const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const { validateProduct, validateUpdateProduct } = require('../validators/productValidators');
const { handleValidationErrors } = require('../middleware/handler');

// Ruta para crear un producto
router.post('/', validateProduct, handleValidationErrors, productController.createProduct);

// Ruta para obtener todos los productos
router.get('/', productController.getAllProducts);

// Ruta para obtener un producto por id
router.get('/:id', productController.getProductById);

// Ruta para actualizar un producto
router.put('/:id', validateUpdateProduct, handleValidationErrors, productController.updateProduct);

// Ruta para eliminar un producto
router.delete('/:id', productController.deleteProduct);

module.exports = router;
