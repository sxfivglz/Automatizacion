const { check } = require('express-validator');
const Category = require('../models/Category');

const nameValidations = [
  check('name').notEmpty().withMessage('El nombre es obligatorio.'),
  check('name').isAlpha('es-ES', { ignore: ' ' }).withMessage('El nombre solo puede contener letras.'),
  check('name').isLength({ max: 50 }).withMessage('El nombre no puede superar los 50 caracteres.'),
];

const uniqueNameValidation = check('name').custom(async (value, { req }) => {
  const category = await Category.findOne({ where: { name: value } });
  if (category && (!req.params.id || category.id !== parseInt(req.params.id, 10))) {
    throw new Error('El nombre ya está en uso.');
  }
});

const descriptionValidation = check('description')
  .isLength({ max: 150 })
  .withMessage('La descripción no puede superar los 150 caracteres.');

const validateCategory = [...nameValidations, uniqueNameValidation, descriptionValidation];
const validateUpdateCategory = [...nameValidations.map((rule) => rule.optional()), uniqueNameValidation, descriptionValidation.optional()];

module.exports = { validateCategory, validateUpdateCategory };
