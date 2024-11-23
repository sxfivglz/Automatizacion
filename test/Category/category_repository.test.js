jest.mock('../../models/Category');

describe('CategoryRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllCategories', () => {
    it('should return all categories', async () => {
      const mockCategories = [{ id: 1, name: 'Category 1' }];
        Category.findAll.mockResolvedValue(mockCategories);
        const result = await CategoryRepository.getAllCategories();
        expect(result).toEqual(mockCategories);
    });
    });

    describe('getCategoryById', () => {
        it('should return a category by id', async () => {
            const mockCategory = { id: 1, name: 'Category 1' };
            Category.findByPk.mockResolvedValue(mockCategory);
            const result = await CategoryRepository.getCategoryById(1);
            expect(result).toEqual(mockCategory);
        });
    });

    describe('createCategory', () => {
        it('should create a new category', async () => {
            const mockCategory = { id: 1, name: 'Category 1' };
            Category.create.mockResolvedValue(mockCategory);
            const result = await CategoryRepository.createCategory(mockCategory);
            expect(result).toEqual(mockCategory);
        });
    });

    describe('updateCategory', () => {
        it('should update a category', async () => {
            const mockCategory = { id: 1, name: 'Category 1' };
            Category.findByPk.mockResolvedValue(mockCategory);
            Category.update.mockResolvedValue([1]);
            const result = await CategoryRepository.updateCategory(1, mockCategory);
            expect(result).toEqual(mockCategory);
        });
    });

    describe('deleteCategory', () => {
        it('should delete a category', async () => {
            const mockCategory = { id: 1, name: 'Category 1' };
            Category.findByPk.mockResolvedValue(mockCategory);
            Category.destroy.mockResolvedValue(1);
            const result = await CategoryRepository.deleteCategory(1);
            expect(result).toEqual(1);
        });
    });

});


