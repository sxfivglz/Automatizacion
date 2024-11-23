const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');
const { validateCategory } = require('../validators/categoryValidators');

// Ruta para crear categoría con validación
router.post('/', validateCategory, categoryController.createCategory);

// Ruta para actualizar categoría con validación
router.put('/:id', validateCategory, categoryController.updateCategory);

// Resto de rutas para obtener o eliminar categorías
router.get('/', categoryController.getAllCategories);
router.get('//:id', categoryController.getCategoryById);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
