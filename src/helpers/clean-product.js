const cleanProduct = (product) => ({
  ...product,
  name: product.name.replace(/[\s\s]+/g, ' ').trim(),
  size: product.size.replace(/�/g, '⌀'),
});

module.exports = cleanProduct;
