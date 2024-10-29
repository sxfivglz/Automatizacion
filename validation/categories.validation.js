const Joi = require('joi');

const categorySchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'El nombre de la categoría no puede estar vacío',
        'any.required': 'El nombre de la categoría no puede estar vacío',
    }).max(50).messages({
        'string.max': 'El nombre de la categoría no puede superar los 50 caracteres',
    }),

    });



module.exports = categorySchema;