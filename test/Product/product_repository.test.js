jest.mock('../../models/Product', () => require('../Mocks/product-category').ProductMock);
jest.mock('../../models/Category', () => require('../Mocks/product-category').CategoryMock);

const ProductRepository = require('../../repositories/ProductRepository');
const Product = require('../../models/Product');


describe('Pruebas con ProductRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Debe obtener todos los productos', async () => {
    
    Product.findAll.mockResolvedValue([
      { id: 1, name: 'Laptop', price: 1200.0, stock: 50, categoryId: 1 },
    ]);

    const products = await ProductRepository.getAllProducts();
    expect(products).toHaveLength(1);
    expect(Product.findAll).toHaveBeenCalledTimes(1);
  });

  test('Debe obtener un producto por ID', async () => {
    
    Product.findByPk.mockResolvedValue({ id: 1, name: 'Laptop', price: 1200.0, stock: 50, categoryId: 1 });

    const product = await ProductRepository.getProductById(1);
    expect(product).toEqual({ id: 1, name: 'Laptop', price: 1200.0, stock: 50, categoryId: 1 });
    expect(Product.findByPk).toHaveBeenCalledWith(1, expect.anything());
  });

  test('Debe manejar error al obtener producto por ID inexistente', async () => {
    
    Product.findByPk.mockResolvedValue(null);

    await expect(ProductRepository.getProductById(999)).rejects.toThrow('Producto no encontrado');
  });

  test('Debe crear un producto correctamente', async () => {
    
    const productData = { name: 'Laptop', price: 1200.0, stock: 50, categoryId: 1 };

    Product.create.mockResolvedValue(productData);

    const product = await ProductRepository.createProduct(productData);
    expect(product).toEqual(productData);
    expect(Product.create).toHaveBeenCalledWith(productData);
  });

  test('Debe manejar error al crear un producto', async () => {
    
    const productData = { name: 'Laptop', price: 1200.0, stock: 50, categoryId: 1 };

    Product.create.mockRejectedValue(new Error('Error al crear el producto'));

    await expect(ProductRepository.createProduct(productData)).rejects.toThrow('Error al crear el producto');
  });

  test('Debe actualizar un producto correctamente', async () => {
    
    const updatedData = { price: 1000.0, stock: 30 };

    Product.findByPk.mockResolvedValue({
      id: 1,
      update: jest.fn().mockResolvedValue({ ...updatedData, id: 1 }),
    });

    const product = await ProductRepository.updateProduct(1, updatedData);
    expect(product).toEqual({ ...updatedData, id: 1 });
  });

  test('Debe manejar error al actualizar un producto no encontrado', async () => {
    
    const updatedData = { price: 1000.0, stock: 30 };

    Product.findByPk.mockResolvedValue(null);

    await expect(ProductRepository.updateProduct(999, updatedData)).rejects.toThrow('Producto no encontrado');
  });

  test('Debe eliminar un producto correctamente', async () => {
    

    Product.findByPk.mockResolvedValue({
      id: 1,
      destroy: jest.fn().mockResolvedValue(1),
    });

    const result = await ProductRepository.deleteProduct(1);
    expect(result).toBe(1);
  });

  test('Debe manejar error al eliminar un producto no encontrado', async () => {
    

    Product.findByPk.mockResolvedValue(null);

    await expect(ProductRepository.deleteProduct(999)).rejects.toThrow('Producto no encontrado');
  });
});
