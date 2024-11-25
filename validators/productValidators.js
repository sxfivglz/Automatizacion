const { check } = require('express-validator');
const Product = require('../models/Product');


const nameValidation = [
  check('name', 'El nombre del producto no puede estar vacío').not().isEmpty(),
  check('name', 'El producto ya existe').custom(async (value) => {
    const product = await Product.findOne({ where: { name: value } });
    if (product) {
      return Promise.reject();
    }
  }),
  check('name', 'El nombre del producto no puede superar los 50 caracteres').isLength({ max: 50 }),
  check('name', 'El nombre del producto no debe contener caracteres especiales ni números').isAlpha('es-ES', { ignore: ' ' })
];


const stockValidation = [
  check('stock', 'El stock del producto debe ser un número').isNumeric().optional(),
  check('stock', 'El stock del producto no puede estar vacío').not().isEmpty().optional(),
  check('stock', 'El stock del producto no puede ser menor a 0').isInt({ min: 0 }).optional()
];

const validateProduct = [
  ...nameValidation, 
  check('price', 'El precio del producto no puede estar vacío').not().isEmpty(),
  check('price', 'El precio del producto debe ser un número').isNumeric(),
  ...stockValidation,
  check('categoryId', 'El producto debe tener una categoría').not().isEmpty(),
];


const validateUpdateProduct = [
  ...nameValidation,
  check('price', 'El precio del producto debe ser un número').isNumeric().optional(),
  ...stockValidation,
  check('categoryId', 'El producto debe tener una categoría').not().isEmpty().optional(),
];

module.exports = { validateProduct, validateUpdateProduct };
