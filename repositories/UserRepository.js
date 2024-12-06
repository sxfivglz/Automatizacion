const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UserRepository {
    async getAllUsers() {
        return await User.findAll();
    }

    async getUserById(id) {
        const user = await User.findByPk(id);
        if (!user) {
            const error = new Error('No se encontró el usuario');
            error.status = 404;
            throw error;
        }
        return user;
    }

    async createUser(user) {
        if (!user.email || !user.password) {
            throw new Error('Email y contraseña son obligatorios');
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        return await User.create(user);
    }

    async updateUser(id, user) {
        const userFound = await User.findByPk(id);
        if (!userFound) {
            const error = new Error('No se encontró el usuario');
            error.status = 404;
            throw error;
        }
        if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
        return await userFound.update(user);
    }

    async deleteUser(id) {
        const userFound = await User.findByPk(id);
        if (!userFound) {
            const error = new Error('No se encontró el usuario');
            error.status = 404;
            throw error;
        }
        return await userFound.destroy();
    }

    async login(email, password) {
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error('Contraseña incorrecta');
            }
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.SECRET_KEY,
                { expiresIn: '7d' }
            );
            return { 
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name // Agrega más campos según tu modelo
                },
                token 
            };
        } catch (error) {
            throw new Error(`Error en login: ${error.message}`);
        }
    }

    async logout(userId) {
        const user = await User.findByPk(userId);
        if (!user) {
            const error = new Error('Usuario no encontrado');
            error.status = 404;
            throw error;
        }
        await user.update({ token: null });
        return { message: 'Sesión cerrada correctamente' };
    }
}

module.exports = new UserRepository();
