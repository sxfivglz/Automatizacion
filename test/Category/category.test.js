jest.mock('../../models/Category'); 
const Category = require('../../models/Category');

describe('Pruebas con mocking en el modelo Category', () => {
    afterEach(() => {
        jest.clearAllMocks(); 
    });

    test('Debe llamar a Category.create con los datos correctos', async () => {
       
        const mockResponse = {
            id: 1,
            name: 'Electronics',
            description: 'Gadgets and devices',
        };
        Category.create.mockResolvedValue(mockResponse);

        
        const data = { name: 'Electronics', description: 'Gadgets and devices' };

        
        const category = await Category.create(data);

        expect(Category.create).toHaveBeenCalledTimes(1);
        expect(Category.create).toHaveBeenCalledWith(data);
        expect(category).toEqual(mockResponse);
    });

    test('Debe manejar errores al crear una categoría', async () => {
        
        const mockError = new Error('Error al crear la categoría');
        Category.create.mockRejectedValue(mockError);


        const data = { name: '' };
       
        await expect(Category.create(data)).rejects.toThrow('Error al crear la categoría');
        expect(Category.create).toHaveBeenCalledTimes(1);
        expect(Category.create).toHaveBeenCalledWith(data);
    });

    test('Debe crear una categoría válida con datos mínimos', async () => {
        
        const mockResponse = { id: 2, name: 'Books' };
        Category.create.mockResolvedValue(mockResponse);
        const data = { name: 'Books' }; 
        const category = await Category.create(data);
        expect(Category.create).toHaveBeenCalledTimes(1);
        expect(Category.create).toHaveBeenCalledWith(data);
        expect(category).toEqual(mockResponse);
    });

    test('Debe manejar error al intentar crear una categoría duplicada', async () => {
        const mockError = new Error('Unique constraint error: Name must be unique');
        Category.create.mockRejectedValue(mockError);
        const data = { name: 'Electronics' };
        await expect(Category.create(data)).rejects.toThrow('Unique constraint error: Name must be unique');
        expect(Category.create).toHaveBeenCalledTimes(1);
        expect(Category.create).toHaveBeenCalledWith(data);
    });

    test('Debe ignorar datos adicionales no definidos en el modelo', async () => {
      
        const mockResponse = { id: 3, name: 'Test', description: 'Test description' };
        Category.create.mockResolvedValue(mockResponse);

       
        const data = { name: 'Test', description: 'Test description', extraField: 'Ignored' };

        const category = await Category.create(data);

        expect(Category.create).toHaveBeenCalledTimes(1);
        expect(Category.create).toHaveBeenCalledWith(data);
        expect(category).toEqual(mockResponse);
    });
});
