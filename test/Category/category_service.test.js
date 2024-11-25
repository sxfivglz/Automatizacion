jest.mock('../../repositories/CategoryRepository'); // Mockea CategoryRepository
const CategoryRepository = require('../../repositories/CategoryRepository');
const CategoryService = require('../../services/categoryService');

describe('Pruebas de CategoryService', () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  test('Debe obtener todas las categorías', async () => {
    const mockCategories = [
      { id: 1, name: 'Electronics', description: 'Electronic devices' },
    ];

    CategoryRepository.getAllCategories.mockResolvedValue(mockCategories);

    const categories = await CategoryService.getAllCategories();

    expect(categories).toEqual(mockCategories);
    expect(CategoryRepository.getAllCategories).toHaveBeenCalledTimes(1);
  });

  test('Debe obtener una categoría por ID', async () => {
    const mockCategory = { id: 1, name: 'Electronics', description: 'Electronic devices' };

    CategoryRepository.getCategoryById.mockResolvedValue(mockCategory);

    const category = await CategoryService.getCategoryById(1);

    expect(category).toEqual(mockCategory);
    expect(CategoryRepository.getCategoryById).toHaveBeenCalledWith(1);
    expect(CategoryRepository.getCategoryById).toHaveBeenCalledTimes(1);
  });

  test('Debe manejar error al obtener una categoría inexistente por ID', async () => {
    CategoryRepository.getCategoryById.mockRejectedValue(new Error('No se encontró la categoría'));

    await expect(CategoryService.getCategoryById(999)).rejects.toThrow('No se encontró la categoría');
    expect(CategoryRepository.getCategoryById).toHaveBeenCalledWith(999);
  });

  test('Debe crear una categoría correctamente', async () => {
    const newCategory = { name: 'Home Appliances', description: 'Appliances for home use' };

    CategoryRepository.createCategory.mockResolvedValue(newCategory);

    const category = await CategoryService.createCategory(newCategory);

    expect(category).toEqual(newCategory);
    expect(CategoryRepository.createCategory).toHaveBeenCalledWith(newCategory);
  });

  test('Debe manejar error al crear una categoría', async () => {
    const newCategory = { name: 'Home Appliances', description: 'Appliances for home use' };

    CategoryRepository.createCategory.mockRejectedValue(new Error('Error al crear la categoría'));

    await expect(CategoryService.createCategory(newCategory)).rejects.toThrow('Error al crear la categoría');
    expect(CategoryRepository.createCategory).toHaveBeenCalledWith(newCategory);
  });

  test('Debe actualizar una categoría correctamente', async () => {
    const updatedCategory = { name: 'Updated Name' };

    CategoryRepository.updateCategory.mockResolvedValue({ id: 1, ...updatedCategory });

    const category = await CategoryService.updateCategory(1, updatedCategory);

    expect(category).toEqual({ id: 1, ...updatedCategory });
    expect(CategoryRepository.updateCategory).toHaveBeenCalledWith(1, updatedCategory);
  });

  test('Debe manejar error al actualizar una categoría inexistente', async () => {
    const updatedCategory = { name: 'Updated Name' };

    CategoryRepository.updateCategory.mockRejectedValue(new Error('No se encontró la categoría'));

    await expect(CategoryService.updateCategory(999, updatedCategory)).rejects.toThrow('No se encontró la categoría');
    expect(CategoryRepository.updateCategory).toHaveBeenCalledWith(999, updatedCategory);
  });

  test('Debe eliminar una categoría correctamente', async () => {
    CategoryRepository.deleteCategory.mockResolvedValue(1);

    const result = await CategoryService.deleteCategory(1);

    expect(result).toBe(1);
    expect(CategoryRepository.deleteCategory).toHaveBeenCalledWith(1);
  });

  test('Debe manejar error al eliminar una categoría inexistente', async () => {
    CategoryRepository.deleteCategory.mockRejectedValue(new Error('No se encontró la categoría'));

    await expect(CategoryService.deleteCategory(999)).rejects.toThrow('No se encontró la categoría');
    expect(CategoryRepository.deleteCategory).toHaveBeenCalledWith(999);
  });
});
