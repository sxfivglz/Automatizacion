
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');
const { validateCategory, validateUpdateCategory } = require('../validators/categoryValidators');
const {handleValidationErrors} = require('../middleware/handler');

// Rutas para categorías
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/', validateCategory, handleValidationErrors, categoryController.createCategory);
router.put('/:id', validateUpdateCategory, handleValidationErrors, categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
