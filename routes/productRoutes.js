const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const { validateProduct, validateUpdateProduct } = require('../validators/productValidators');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', validateProduct, productController.createProduct);
router.put('/:id', validateUpdateProduct, productController.updateProduct);
router.delete('/:id',  productController.deleteProduct);

module.exports = router;
