const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryService {
  async getAllCategories() {
    return await CategoryRepository.getAllCategories();
  }

  async getCategoryById(id) {
    return await CategoryRepository.getCategoryById(id);
  }

  async createCategory(category) {
    return await CategoryRepository.createCategory(category);
  }

  async updateCategory(id, category) {
    return await CategoryRepository.updateCategory(id, category);
  }

  async deleteCategory(id) {
    return await CategoryRepository.deleteCategory(id);
  }
}

module.exports = new CategoryService();