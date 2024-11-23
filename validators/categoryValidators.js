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

    const validateUpdateCategory = [
        check('name', 'El nombre de la categoría no puede superar los 50 caracteres').isLength({max: 50}).optional(),
        check('description', 'La descripción de la categoría no puede contener más de 150 caracteres').isLength({max: 150}).optional(),
        check('name', 'El nombre de la categoría ya existe').custom(async (value, {req}) => {
            const category = await Category.findOne({where: {name: value}});
            if (category && category.id !== req.params.id) {
                return Promise.reject();
            }
        }),

        check('name', 'El nombre de la categoría no puede estar vacío').not().isEmpty().optional(),
    ];



module.exports = { validateCategory, validateUpdateCategory };