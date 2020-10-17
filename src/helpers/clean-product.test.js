const cleanProduct = require('./clean-product');

describe('cleanProduct', () => {
  const product = {
    name: ' Adromischus   marianae F. Herrei ',
    size: '� 24',
  };
  it('should normalize space in name', () => {
    expect(cleanProduct(product)).toEqual(
      expect.objectContaining({
        name: 'Adromischus marianae F. Herrei',
        size: '⌀ 24',
      }),
    );
  });
});
