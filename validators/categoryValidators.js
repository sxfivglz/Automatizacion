const {check } = require('express-validator');
const Category = require('../models/Category');
const validateCategory = [
    check('name', 'El nombre de la categoría ya existe').custom(async (value) => {
        const category = await Category.findOne({where: {name: value}});
        if (category) {
            return Promise.reject();
        }
    }),
    check('name', 'El nombre de la categoría no puede estar vacío').not().isEmpty(),
    check('name', 'El nombre de la categoría no puede superar los 50 caracteres').isLength({max: 50}),
    check('description', 'La descripción de la categoría no puede contener más de 150 caracteres').isLength({max: 150}),
    

    ];

module.exports = { validateCategory };