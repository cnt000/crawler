

const CollectPlpProducts = require('./CollectPlpProducts');
const htmlPlpString = require('./__mocks__/htmlPlpString');

describe('CollectPlpProducts', () => {
  const product = [
    {
      add: '../php/cart_it.php?action=add_item&id=2011&qty=1',
      href: '../php/detail.php?id_num=2011',
      image: '../php/images/lo/sedum_rubro2017.jpg',
      name: 'Sedum  rubrotinctum  Ø 10',
      page: 1,
      price: '€ 5,00',
    },
  ];
  it('should generate full plp entry', () => {
    expect(CollectPlpProducts(htmlPlpString, 1)).toMatchObject(product);
  });
  it('should generate empty plp entry', () => {
    const htmlString = '<p>ciao</p>';
    expect(CollectPlpProducts(htmlString, 1)).toEqual(
      expect.arrayContaining([]),
    );
  });
});
