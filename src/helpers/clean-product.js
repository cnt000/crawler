const cleanProduct = (product) => ({
  ...product,
  name: product.name.replace(/[�|\s\s+]/g, ' ').replace(/([0-9]+)$/g, '⌀$1'),
  size: product.size.replace(/�/g, '⌀'),
});

module.exports = cleanProduct;
