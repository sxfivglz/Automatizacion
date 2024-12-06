const UserService = require('../services/userService');
const jwt = require('jsonwebtoken');
class UserController {

    async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            //Error details
            res.status(500).json({ message: error.message });
            
        }
    }

    async getUserById(req, res) {
        try {
            const user = await UserService.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.status(200).json(user);
        } catch (error) {
            //Error details
            res.status(500).json({ message: error.message, stack: error.stack });
            
        }
    }

    async createUser(req, res) {
        try {
            const user = await UserService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            //Error details
            res.status(500).json({ message: error.message });
            
        }
    }

    async updateUser(req, res) {
        try {
            const user = await UserService.updateUser(req.params.id, req.body);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.status(200).json(user);
        } catch (error) {
            //Error details
            res.status(500).json({ message: error.message });
            
        }
    }

    async deleteUser(req, res) {
        try {
            const user = await UserService.deleteUser(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.status(200).json({ message: 'Usuario eliminado' });
        } catch (error) {
            //Error details
            res.status(500).json({ message: error.message });
            
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const { user, token } = await UserService.login(email, password);
            res.status(200).json({ user, token });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async logout(req, res) {
        try {
          
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Token no proporcionado' });
            }
    
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const userId = decoded.id; 
    
            await UserService.logout(userId);
            res.status(200).json({ message: 'Sesión cerrada' });
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Token inválido' });
            }
            //Error details
            res.status(500).json({ message: error.message });
            
        }
    }
}

module.exports = new UserController();