const Category = require('../models/Category');

class CategoryRepository {
  async getAllCategories() {
    return await Category.findAll();
  }

  async getCategoryById(id) {
    return await Category.findByPk(id);
  }

  async createCategory(category) {
    return await Category.create(category);
  }

  async updateCategory(id, category) {
    const categoryFound = await Category.findByPk(id);
    if (!categoryFound) throw new Error('No se encontró la categoría');
    return await categoryFound.update(category);
  }

  async deleteCategory(id) {
    const categoryFound = await Category.findByPk(id);
    if (!categoryFound) throw new Error('No se encontró la categoría');
    return await categoryFound.destroy();
  }
}

module.exports = new CategoryRepository();