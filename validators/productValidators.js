const {check} = require('express-validator');
const Product = require('../models/Product');
const validateProduct = [
    
    check('name', 'El nombre del producto no puede estar vacío').not().isEmpty(),
    check('name', 'El producto ya existe').custom(async (value) => {
        const product = await Product.findOne({where: {name: value}});
        if (product) {
            return Promise.reject();
        }
    }),
    
    check('name', 'El nombre del producto no puede superar los 50 caracteres').isLength({max: 50}),
    check('description', 'La descripción del producto no puede contener más de 150 caracteres').isLength({max: 150}),
    check('price', 'El precio del producto no puede estar vacío').not().isEmpty(),
    check('price', 'El precio del producto debe ser un número').isNumeric(),
    check('stock', 'El stock del producto no puede estar vacío').not().isEmpty(),
    check('stock', 'El stock del producto debe ser un número').isNumeric(),
    check('categoryId', 'El producto debe tener una categoría').not().isEmpty(),
];

const validateUpdateProduct = [
    check('name', 'El nombre del producto no puede superar los 50 caracteres').isLength({max: 50}).optional(),
    check('description', 'La descripción del producto no puede contener más de 150 caracteres').isLength({max: 150}).optional(),
    check('price', 'El precio del producto debe ser un número').isNumeric().optional(),
    check('stock', 'El stock del producto debe ser un número').isNumeric().optional(),
    check('categoryId', 'El producto debe tener una categoría').not().isEmpty().optional(),
];

module.exports = { validateProduct, validateUpdateProduct };