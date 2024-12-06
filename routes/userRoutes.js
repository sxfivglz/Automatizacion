const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

const authenticateToken = require('../middleware/auth');
const {handleValidationErrors} = require('../middleware/handler');

// Rutas para usuarios
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id',  userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/login', userController.login);
router.post('/logout',authenticateToken, userController.logout);

module.exports = router;