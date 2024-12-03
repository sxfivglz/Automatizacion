jest.mock('../../repositories/ProductRepository');
const ProductRepository = require('../../repositories/ProductRepository');
const ProductService = require('../services/ProductService');


describe('Pruebas de ProductService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Debe obtener todos los productos', async () => {
    const mockProducts = [
      { id: 1, name: 'Laptop', description: 'High-performance laptop', price: 1500 },
    ];

    ProductRepository.getAllProducts.mockResolvedValue(mockProducts);

    const result = await ProductService.getAllProducts();

    expect(result).toEqual({ success: true, data: mockProducts });
    expect(ProductRepository.getAllProducts).toHaveBeenCalledTimes(1);
  });

  test('Debe manejar error al obtener todos los productos', async () => {
    ProductRepository.getAllProducts.mockRejectedValue(new Error('Database connection error'));

    await expect(ProductService.getAllProducts()).rejects.toThrow(
      'Error al obtener los productos: Database connection error'
    );
    expect(ProductRepository.getAllProducts).toHaveBeenCalledTimes(1);
  });

  test('Debe obtener un producto por ID', async () => {
    const mockProduct = { id: 1, name: 'Laptop', description: 'High-performance laptop', price: 1500 };

    ProductRepository.getProductById.mockResolvedValue(mockProduct);

    const result = await ProductService.getProductById(1);

    expect(result).toEqual({ success: true, data: mockProduct });
    expect(ProductRepository.getProductById).toHaveBeenCalledWith(1);
    expect(ProductRepository.getProductById).toHaveBeenCalledTimes(1);
  });

  test('Debe manejar error al obtener un producto inexistente por ID', async () => {
    ProductRepository.getProductById.mockResolvedValue(null);

    await expect(ProductService.getProductById(999)).rejects.toThrow(
      'Producto con ID 999 no encontrado'
    );
    expect(ProductRepository.getProductById).toHaveBeenCalledWith(999);
  });

  test('Debe manejar error al obtener un producto por ID (fallo del repositorio)', async () => {
    ProductRepository.getProductById.mockRejectedValue(new Error('Database error'));

    await expect(ProductService.getProductById(1)).rejects.toThrow(
      'Error al obtener el producto: Database error'
    );
    expect(ProductRepository.getProductById).toHaveBeenCalledWith(1);
  });

  test('Debe crear un producto correctamente', async () => {
    const newProduct = { name: 'Smartphone', description: 'Latest model', price: 800 };
    ProductRepository.createProduct.mockResolvedValue(newProduct);

    const result = await ProductService.createProduct(newProduct);

    expect(result).toEqual({
      success: true,
      message: 'Producto creado exitosamente',
      data: newProduct,
    });
    expect(ProductRepository.createProduct).toHaveBeenCalledWith(newProduct);
  });

  test('Debe manejar error al crear un producto', async () => {
    const newProduct = { name: 'Smartphone', description: 'Latest model', price: 800 };
    ProductRepository.createProduct.mockRejectedValue(new Error('Validation error'));

    await expect(ProductService.createProduct(newProduct)).rejects.toThrow(
      'Error al crear el producto: Validation error'
    );
    expect(ProductRepository.createProduct).toHaveBeenCalledWith(newProduct);
  });

  test('Debe actualizar un producto correctamente', async () => {
    const updatedProduct = { name: 'Gaming Laptop', price: 2000 };

    ProductRepository.updateProduct.mockResolvedValue({ id: 1, ...updatedProduct });

    const result = await ProductService.updateProduct(1, updatedProduct);

    expect(result).toEqual({
      success: true,
      message: 'Producto actualizado exitosamente',
      data: { id: 1, ...updatedProduct },
    });
    expect(ProductRepository.updateProduct).toHaveBeenCalledWith(1, updatedProduct);
  });

  test('Debe manejar error al actualizar un producto', async () => {
    const updatedProduct = { name: 'Gaming Laptop', price: 2000 };
    ProductRepository.updateProduct.mockRejectedValue(new Error('Update failed'));

    await expect(ProductService.updateProduct(1, updatedProduct)).rejects.toThrow(
      'Error al actualizar el producto: Update failed'
    );
    expect(ProductRepository.updateProduct).toHaveBeenCalledWith(1, updatedProduct);
  });

  test('Debe eliminar un producto correctamente', async () => {
    ProductRepository.deleteProduct.mockResolvedValue(1);

    const result = await ProductService.deleteProduct(1);

    expect(result).toEqual({
      success: true,
      message: 'Producto eliminado exitosamente',
    });
    expect(ProductRepository.deleteProduct).toHaveBeenCalledWith(1);
  });

  test('Debe manejar error al eliminar un producto', async () => {
    ProductRepository.deleteProduct.mockRejectedValue(new Error('Delete operation failed'));

    await expect(ProductService.deleteProduct(1)).rejects.toThrow(
      'Error al eliminar el producto: Delete operation failed'
    );
    expect(ProductRepository.deleteProduct).toHaveBeenCalledWith(1);
  });
});
