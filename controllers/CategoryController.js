const categoryService = require('../services/categoryService');

class CategoryController {
  async getAllCategories(req, res) {
    try {
      const categories = await categoryService.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getCategoryById(req, res) {
    try {
      const { id } = req.params;
      const category = await categoryService.getCategoryById(id);
      if (!category) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createCategory(req, res) {
    try {
      const category = req.body;
      const newCategory = await categoryService.createCategory(category);
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const category = req.body;
      const updatedCategory = await categoryService.updateCategory(id, category);
      res.status(200).json(updatedCategory);
    } catch (error) {
      if (error.message === 'No se encontró la categoría') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  }

  async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      await categoryService.deleteCategory(id);
      res.status(204).end();
    } catch (error) {
      if (error.message === 'No se encontró la categoría') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  }
}

module.exports = new CategoryController();
