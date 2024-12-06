const UserRepository = require('../repositories/userRepository');

class UserService {

    async getAllUsers() {
        return await UserRepository.getAllUsers();
    }
    
    async getUserById(id) {
        return await UserRepository.getUserById(id);
    }

    async createUser(user) {
        return await UserRepository.createUser(user);
    }

    async updateUser(id, user) {
        return await UserRepository.updateUser(id, user);
    }

    async deleteUser(id) {
        return await UserRepository.deleteUser(id);
    }

    async login(email, password) {
        return await UserRepository.login(email, password);
    }

    async logout(userId) {
        return await UserRepository.logout(userId);
    }
}

module.exports = new UserService();