const Category = require('../../models/Category');

describe('Category Model', () => {
  it('Should create a new category', () => {
    const category = new Category(1, 'Electronics');


    expect(category.id).toBe(1);
    expect(category.name).toBe('Electronics');
  });

  it('Should fail to create a category without required parameters', () => {
    const category = new Category();  
    expect(category.id).toBeUndefined(); 
    expect(category.name).toBeUndefined(); 
  });
  it('Should fail to create a category without required parameters', () => {
    const category = new Category();  
    expect(category.id).toBeUndefined(); 
    expect(category.name).toBeUndefined(); 
  });

});
