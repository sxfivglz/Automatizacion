const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'El nombre del producto no puede estar vacío',
        'any.required': 'El nombre del producto no puede estar vacío',
    }).max(50).messages({
        'string.max': 'El nombre del producto no puede superar los 50 caracteres',
    }),
    price: Joi.number().required().messages({
        'number.empty': 'El precio del producto no puede estar vacío',
        'any.required': 'El precio del producto no puede estar vacío',
    }),
    categoryId: Joi.number().required().messages({
        'number.empty': 'La categoría del producto no puede estar vacía',
        'any.required': 'La categoría del producto no puede estar vacía',
    }),
    description: Joi.string().required().messages({
        'string.empty': 'La descripción del producto no puede estar vacía',
        'any.required': 'La descripción del producto no puede estar vacía',
    }).max(255).messages({
        'string.max': 'La descripción del producto no puede superar los 255 caracteres',
    }),
    stock: Joi.number().required().messages({
        'number.empty': 'El stock del producto no puede estar vacío',
        'any.required': 'El stock del producto no puede estar vacío',
    })
});

module.exports = productSchema;