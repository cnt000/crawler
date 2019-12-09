const cheerio = require('cheerio');

const CollectPdpProduct = html => {
  const $ = cheerio.load(html);
  const $table = $('#paginone tr:first-child > td > table');
  const $sizeAndPriceTable = $table.find('tr table');
  const name = $table.find('div > span').text();
  const image = $table
    .find('tr:nth-child(2) img:not([src="../media/spacer.gif"])')
    .attr('src');
  const size = $sizeAndPriceTable
    .find('tr:nth-child(1) td:nth-child(2) span')
    .text();
  const price = $sizeAndPriceTable
    .find('tr:nth-child(3) td:nth-child(2) span')
    .text();
  const addToCartLink = $table.find('tr:nth-of-type(1n) td a').attr('href');
  const product = {
    name,
    image,
    size,
    price,
    addToCartLink,
  };
  return product;
};

module.exports = CollectPdpProduct;
