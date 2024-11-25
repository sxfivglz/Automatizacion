jest.mock('../../models/Category', () => require('../Mocks/product-category').CategoryMock);

const CategoryRepository = require('../../repositories/CategoryRepository');
const Category = require('../../models/Category'); // Asegúrate de que se importa el modelo mockeado

describe('Pruebas con CategoryRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Debe obtener todas las categorías', async () => {
    Category.findAll.mockResolvedValue([
      { id: 1, name: 'Electronics', description: 'Electronic devices' }
    ]);
    const categories = await CategoryRepository.getAllCategories();
    expect(categories).toHaveLength(1);
    expect(Category.findAll).toHaveBeenCalledTimes(1);
  });

  test('Debe obtener una categoría por ID', async () => {
    Category.findByPk.mockResolvedValue({ id: 1, name: 'Electronics', description: 'Electronic devices' });
    const category = await CategoryRepository.getCategoryById(1);
    expect(category).toEqual({ id: 1, name: 'Electronics', description: 'Electronic devices' });
    expect(Category.findByPk).toHaveBeenCalledWith(1);
  });

  test('Debe manejar error al obtener categoría por ID inexistente', async () => {
    Category.findByPk.mockResolvedValue(null);
    await expect(CategoryRepository.getCategoryById(999)).rejects.toThrow('No se encontró la categoría');
  });

  test('Debe crear una categoría correctamente', async () => {
    const categoryData = { name: 'Electronics', description: 'Electronic devices' };
    Category.create.mockResolvedValue(categoryData);
    const category = await CategoryRepository.createCategory(categoryData);
    expect(category).toEqual(categoryData);
    expect(Category.create).toHaveBeenCalledWith(categoryData);
  });

  test('Debe manejar error al crear una categoría', async () => {
    const categoryData = { name: 'Electronics', description: 'Electronic devices' };
    Category.create.mockRejectedValue(new Error('Error al crear la categoría'));
    await expect(CategoryRepository.createCategory(categoryData)).rejects.toThrow('Error al crear la categoría');
  });

  test('Debe actualizar una categoría correctamente', async () => {
    const updatedData = { name: 'Home Appliances' };
    Category.findByPk.mockResolvedValue({
      id: 1,
      update: jest.fn().mockResolvedValue({ ...updatedData, id: 1 })
    });
    const category = await CategoryRepository.updateCategory(1, updatedData);
    expect(category).toEqual({ ...updatedData, id: 1 });
  });

  test('Debe manejar error al actualizar una categoría no encontrada', async () => {
    const updatedData = { name: 'Home Appliances' };
    Category.findByPk.mockResolvedValue(null);
    await expect(CategoryRepository.updateCategory(999, updatedData)).rejects.toThrow('No se encontró la categoría');
  });

  test('Debe eliminar una categoría correctamente', async () => {
    Category.findByPk.mockResolvedValue({
      id: 1,
      destroy: jest.fn().mockResolvedValue(1)
    });
    const result = await CategoryRepository.deleteCategory(1);
    expect(result).toBe(1);
  });

  test('Debe manejar error al eliminar una categoría no encontrada', async () => {
    Category.findByPk.mockResolvedValue(null);
    await expect(CategoryRepository.deleteCategory(999)).rejects.toThrow('No se encontró la categoría');
  });
});
