jest.mock('../../models/Product'); 
const Product = require('../../models/Product');
const Category = require('../../models/Category'); 

describe('Pruebas con mocking en el modelo Product', () => {
    afterEach(() => {
        jest.clearAllMocks(); 
    });

    test('Debe llamar a Product.create con los datos correctos', async () => {
       
        const mockResponse = {
            id: 1,
            name: 'Laptop',
            price: 1200.00,
            stock: 50,
            categoryId: 1,
        };
        Product.create.mockResolvedValue(mockResponse);

       
        const data = { name: 'Laptop', price: 1200.00, stock: 50, categoryId: 1 };

       
        const product = await Product.create(data);

        expect(Product.create).toHaveBeenCalledTimes(1);
        expect(Product.create).toHaveBeenCalledWith(data);
        expect(product).toEqual(mockResponse);
    });

    test('Debe manejar errores al crear un producto con precio negativo', async () => {
      
        const mockError = new Error('Validation error: Price must be positive');
        Product.create.mockRejectedValue(mockError);

       
        const data = { name: 'Phone', price: -200.00, stock: 100, categoryId: 1 };

        
        await expect(Product.create(data)).rejects.toThrow('Validation error: Price must be positive');
        expect(Product.create).toHaveBeenCalledTimes(1);
        expect(Product.create).toHaveBeenCalledWith(data);
    });

    test('Debe recuperar un producto por ID con Product.findOne', async () => {
        
        const mockResponse = {
            id: 1,
            name: 'Laptop',
            price: 1200.00,
            stock: 50,
            categoryId: 1,
        };
        Product.findOne.mockResolvedValue(mockResponse);

       
        const product = await Product.findOne({ where: { id: 1 } });

        // Verificaciones
        expect(Product.findOne).toHaveBeenCalledTimes(1);
        expect(Product.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
        expect(product).toEqual(mockResponse);
    });

    test('Debe manejar error al intentar recuperar un producto inexistente', async () => {
      
        Product.findOne.mockResolvedValue(null); 

     
        const product = await Product.findOne({ where: { id: 999 } });

        expect(Product.findOne).toHaveBeenCalledTimes(1);
        expect(Product.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
        expect(product).toBeNull();
    });

    test('Debe eliminar un producto con Product.destroy', async () => {
    
        Product.destroy.mockResolvedValue(1); 

        const result = await Product.destroy({ where: { id: 1 } });

  
        expect(Product.destroy).toHaveBeenCalledTimes(1);
        expect(Product.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
        expect(result).toBe(1); 
    });

    test('Debe manejar error al intentar eliminar un producto inexistente', async () => {
  
        Product.destroy.mockResolvedValue(0); 

        const result = await Product.destroy({ where: { id: 999 } });

        expect(Product.destroy).toHaveBeenCalledTimes(1);
        expect(Product.destroy).toHaveBeenCalledWith({ where: { id: 999 } });
        expect(result).toBe(0); 
    });

    test('Debe manejar error al intentar crear un producto con stock negativo', async () => {
        const mockError = new Error('Validation error: Stock cannot be negative');
        Product.create.mockRejectedValue(mockError);

        const data = { name: 'Table', price: 150.00, stock: -10, categoryId: 1 };

        await expect(Product.create(data)).rejects.toThrow('Validation error: Stock cannot be negative');
        expect(Product.create).toHaveBeenCalledTimes(1);
        expect(Product.create).toHaveBeenCalledWith(data);
    });
});
