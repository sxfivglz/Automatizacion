jest.mock('../../services/categoryService'); // Mockeamos el servicio CategoryService
const request = require('supertest');
const app = require('../../app'); // Suponiendo que tu aplicación Express está exportada desde app.js
const categoryService = require('../../services/categoryService');

describe('Pruebas del CategoryController', () => {

  afterEach(() => {
    jest.clearAllMocks(); // Limpiamos los mocks después de cada prueba
  });

  test('Debe obtener todas las categorías', async () => {
    const mockCategories = [
      { id: 1, name: 'Electronics' },
      { id: 2, name: 'Clothing' }
    ];
    categoryService.getAllCategories.mockResolvedValue(mockCategories);

    const response = await request(app).get('/api/categories');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockCategories);
    expect(categoryService.getAllCategories).toHaveBeenCalledTimes(1);
  });

  test('Debe manejar error al obtener todas las categorías', async () => {
    categoryService.getAllCategories.mockRejectedValue(new Error('Error al obtener categorías'));

    const response = await request(app).get('/api/categories');
    
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Error al obtener categorías' });
  });

  test('Debe obtener una categoría por ID', async () => {
    const mockCategory = { id: 1, name: 'Electronics' };
    categoryService.getCategoryById.mockResolvedValue(mockCategory);

    const response = await request(app).get('/api/categories/1');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockCategory);
    expect(categoryService.getCategoryById).toHaveBeenCalledWith('1');
  });

  test('Debe manejar error al obtener categoría por ID no existente', async () => {
    categoryService.getCategoryById.mockResolvedValue(null);

    const response = await request(app).get('/api/categories/999');
    
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Categoría no encontrada' });
  });

  test('Debe manejar error al obtener una categoría por ID', async () => {
    categoryService.getCategoryById.mockRejectedValue(new Error('Error al obtener categoría'));

    const response = await request(app).get('/api/categories/1');
    
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Error al obtener categoría' });
  });

  test('Debe crear una categoría correctamente', async () => {
    const newCategory = { name: 'Furniture' };
    const createdCategory = { id: 3, ...newCategory };
    categoryService.createCategory.mockResolvedValue(createdCategory);

    const response = await request(app).post('/api/categories').send(newCategory);
    
    expect(response.status).toBe(201);
    expect(response.body).toEqual(createdCategory);
    expect(categoryService.createCategory).toHaveBeenCalledWith(newCategory);
  });

  test('Debe manejar error al crear una categoría', async () => {
    const newCategory = { name: 'Furniture' };
    categoryService.createCategory.mockRejectedValue(new Error('Error al crear categoría'));

    const response = await request(app).post('/api/categories').send(newCategory);
    
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Error al crear categoría' });
  });

  test('Debe actualizar una categoría correctamente', async () => {
    const updatedCategory = { name: 'Home Appliances' };
    const categoryWithId = { id: 1, ...updatedCategory };
    categoryService.updateCategory.mockResolvedValue(categoryWithId);

    const response = await request(app).put('/api/categories/1').send(updatedCategory);
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(categoryWithId);
    expect(categoryService.updateCategory).toHaveBeenCalledWith('1', updatedCategory);
  });

  test('Debe manejar error al actualizar una categoría no existente', async () => {
    const updatedCategory = { name: 'Home Appliances' };
    categoryService.updateCategory.mockRejectedValue(new Error('No se encontró la categoría'));

    const response = await request(app).put('/api/categories/999').send(updatedCategory);
    
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'No se encontró la categoría' });
  });

  test('Debe manejar error al actualizar una categoría', async () => {
    const updatedCategory = { name: 'Home Appliances' };
    categoryService.updateCategory.mockRejectedValue(new Error('Error al actualizar categoría'));

    const response = await request(app).put('/api/categories/1').send(updatedCategory);
    
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Error al actualizar categoría' });
  });

  test('Debe eliminar una categoría correctamente', async () => {
    categoryService.deleteCategory.mockResolvedValue();

    const response = await request(app).delete('/api/categories/1');
    
    expect(response.status).toBe(204);
    expect(categoryService.deleteCategory).toHaveBeenCalledWith('1');
  });

  test('Debe manejar error al eliminar una categoría no existente', async () => {
    categoryService.deleteCategory.mockRejectedValue(new Error('No se encontró la categoría'));

    const response = await request(app).delete('/api/categories/999');
    
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'No se encontró la categoría' });
  });

  test('Debe manejar error al eliminar una categoría', async () => {
    categoryService.deleteCategory.mockRejectedValue(new Error('Error al eliminar categoría'));

    const response = await request(app).delete('/api/categories/1');
    
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Error al eliminar categoría' });
  });

});
