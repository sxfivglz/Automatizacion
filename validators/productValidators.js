const { check } = require('express-validator');
const Product = require('../models/Product');


const nameValidation = [
  check('name', 'El nombre del producto no puede estar vacío').not().isEmpty(),
  check('name').custom(async (value, { req }) => {
    const product = await Product.findOne({ where: { name: value } });
    if (product) {
      if (!req.params.id) {
        throw new Error('El nombre ya está en uso.');
      }
      if (product.id !== parseInt(req.params.id, 10)) {
        throw new Error('El nombre ya está en uso.');
      }
    }
  }),
  check('name', 'El nombre del producto no puede superar los 50 caracteres').isLength({ max: 50 }),
];


const stockValidation = [
  check('stock', 'El stock del producto debe ser un número').isNumeric().optional(),
  check('stock', 'El stock del producto no puede estar vacío').not().isEmpty().optional(),
  check('stock', 'El stock del producto no puede ser menor a 0').isInt({ min: 0 }).optional(),
  check('stock', 'El stock del producto no puede ser mayor a 1,000,000').isInt({ max: 1000000 }).optional() 
];

const validateProduct = [
  ...nameValidation, 
  check('price', 'El precio del producto no puede estar vacío').not().isEmpty(),
  check('price', 'El precio del producto debe ser un número').isNumeric(),
  check('price', 'El precio del producto no puede ser menor a 0').isFloat({ min: 0 }),
  ...stockValidation,
  check('categoryId', 'El producto debe tener una categoría').not().isEmpty(),
];


const validateUpdateProduct = [
  ...nameValidation,
  check('price', 'El precio del producto debe ser un número').isNumeric().optional(),
  ...stockValidation,
  check('categoryId', 'El producto debe tener una categoría').not().isEmpty().optional(),
  check('price', 'El precio del producto debe ser mayor a 0').isFloat({ min: 0 }).optional(),
  check('stock', 'El stock del producto debe ser un número').isNumeric().optional(),
  check('stock', 'El stock del producto no puede ser menor a 0').isInt({ min: 0 }).optional(),
];

module.exports = { validateProduct, validateUpdateProduct };
