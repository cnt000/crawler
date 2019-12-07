const cheerio = require('cheerio');

const CollectPdpProducts = (html) => {
  const $ = cheerio.load(html);
  const $firstAnchor = $.find('td:nth-of-type(1n) a');
  // $('#paginone table:nth-of-type(2n) tr').each(function(i, elem) {
  //   const $this = $(this);
  //   const $firstAnchor = $this.find('td:nth-of-type(1n) a');

  //   const pdpName = $firstAnchor.text().trim();
  //   const pdpLink = $firstAnchor.attr('href');
  //   const pdpThumbnailSrc = $this.find('td:nth-of-type(2n) img').attr('src');
  //   const pdpPrice = $this
  //     .find('td:nth-of-type(3n)')
  //     .text()
  //     .trim();
  //   const pdpAddToCartLink = $this.find('td:nth-of-type(4n) a').attr('href');

  //   products.push({
  //     name: pdpName,
  //     href: pdpLink,
  //     image: pdpThumbnailSrc,
  //     price: pdpPrice,
  //     add: pdpAddToCartLink,
  //     page: index,
  //   });
  // });
  return $firstAnchor;
};

module.exports = CollectPdpProducts;
