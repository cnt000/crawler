const CollectPdpProduct = require('./CollectPdpProduct');
const htmlPdpString = require('./__mocks__/htmlPdpString');

describe('CollectPdpProduct', () => {
  const product = {
    name: 'Adromischus  clavifolius ',
    image: 'images/hi/adromischus-clavifolius.jpg',
    price: '9,00',
    size: 'Ø 24',
    addToCartLink: '../php/cart_it.php?action=add_item&id=2078&qty=1',
  };
  it('should generate pdp entry', () => {
    expect(CollectPdpProduct(htmlPdpString)).toMatchObject(product);
  });
  it('should generate empty pdp entry', () => {
    const htmlString = '<p>ciao</p>';
    expect(CollectPdpProduct(htmlString)).toEqual(expect.arrayContaining([]));
  });
});
