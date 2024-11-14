const Product = require('../../models/Product');

describe('Product Model', () => {
  it('should create a new Product', () => {
    const product = new Product(1, 'Phone', 500, 2);


    expect(product.id).toBe(1);
    expect(product.name).toBe('Phone');
    expect(product.price).toBe(500);
    expect(product.categoryId).toBe(2); 
  });

  it('should fail to create a product without required parameters', () => {

    const product = new Product(); 

    expect(product.id).toBeUndefined(); 
    expect(product.name).toBeUndefined(); 
    expect(product.price).toBeUndefined(); 
    expect(product.categoryId).toBeUndefined(); 
  });
});
