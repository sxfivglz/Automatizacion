// services/categoryService.js
const { Category } = require('../models/Category');

class CategoryService {
  async createCategory(data) {
    return await Category.create(data);
  }

  async getCategoryById(id) {
    return await Category.findByPk(id);
  }

  async getAllCategories() {
    return await Category.findAll();
  }

  async updateCategory(id, data) {
    const category = await Category.findByPk(id);
    if (category) {
      return await category.update(data);
    }
    return null;
  }

  async deleteCategory(id) {
    const category = await Category.findByPk(id);
    if (category) {
      await category.destroy();
      return true;
    }
    return false;
  }
}

module.exports = new CategoryService();
