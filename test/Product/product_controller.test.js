jest.mock('../../services/ProductService'); 
const request = require('supertest');
const app = require('../../app'); 
const ProductService = require('../services/ProductService');


describe('Pruebas del ProductController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Debe obtener todos los productos', async () => {
    const mockProducts = [
      { id: 1, name: 'Product 1', price: 100, stock: 50, categoryId: 1 },
      { id: 2, name: 'Product 2', price: 200, stock: 30, categoryId: 2 },
    ];
    productService.getAllProducts.mockResolvedValue(mockProducts); 

    const response = await request(app).get('/api/products'); 

    expect(response.status).toBe(200); 
    expect(response.body).toEqual(mockProducts);
    expect(productService.getAllProducts).toHaveBeenCalledTimes(1); 
  });

  test('Debe obtener un producto por ID', async () => {
    const mockProduct = { id: 1, name: 'Product 1', price: 100 };
    productService.getProductById.mockResolvedValue(mockProduct);

    const response = await request(app).get('/api/products/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProduct);
    expect(productService.getProductById).toHaveBeenCalledWith('1');
  });

  test('Debe retornar 404 si no se encuentra el producto por ID', async () => {
    productService.getProductById.mockResolvedValue(null); 

    const response = await request(app).get('/api/products/999');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Producto no encontrado' });
  });

  test('Debe crear un nuevo producto', async () => {
    const newProduct = { name: 'New Product', price: 150, stock: 100, categoryId: 1 };
    const createdProduct = { id: 3, ...newProduct };
    productService.createProduct.mockResolvedValue(createdProduct);

    const response = await request(app).post('/api/products').send(newProduct);

    expect(response.status).toBe(201);
   
    expect(response.body).toEqual(createdProduct);
    expect(productService.createProduct).toHaveBeenCalledWith(newProduct);
  });

  test('Debe actualizar un producto', async () => {
    const updatedProduct = { id: 1, name: 'Updated Product', price: 180 };
    productService.updateProduct.mockResolvedValue(updatedProduct);

    const response = await request(app).put('/api/products/1').send(updatedProduct);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedProduct);
    expect(productService.updateProduct).toHaveBeenCalledWith('1', updatedProduct);
  });

  test('Debe retornar 404 si no se encuentra el producto al intentar actualizar', async () => {
    const updatedProduct = { name: 'Updated Product', price: 180 };
    productService.updateProduct.mockRejectedValue(new Error('No se encontró el producto'));

    const response = await request(app).put('/api/products/999').send(updatedProduct);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'No se encontró el producto' });
  });

  test('Debe eliminar un producto', async () => {
    productService.deleteProduct.mockResolvedValue();

    const response = await request(app).delete('/api/products/1');

    expect(response.status).toBe(204); 
    expect(productService.deleteProduct).toHaveBeenCalledWith('1');
  });

  test('Debe retornar 404 si no se encuentra el producto al intentar eliminar', async () => {
    productService.deleteProduct.mockRejectedValue(new Error('No se encontró el producto'));

    const response = await request(app).delete('/api/products/999');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'No se encontró el producto' });
  });

    test('Debe manejar errores al obtener todos los productos', async () => {
        productService.getAllProducts.mockRejectedValue(new Error('Error al obtener productos'));
    
        const response = await request(app).get('/api/products');
    
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: 'Error al obtener productos' });
    });

    test('Debe manejar errores al obtener un producto por ID', async () => {
        productService.getProductById.mockRejectedValue(new Error('Error al obtener producto'));
    
        const response = await request(app).get('/api/products/1');
    
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: 'Error al obtener producto' });
    });


 



});
