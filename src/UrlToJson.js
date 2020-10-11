const { FetchToText } = require('./FetchTo');
const { Save } = require('./Save');
const cleanProduct = require('./helpers/clean-product');

const UrlToJson = async (url, filename, crawlFunc, type, log) => {
  try {
    const html = await FetchToText(url);
    const dataFromWebpage = cleanProduct(crawlFunc(html, filename));
    await Save(filename, dataFromWebpage, type);
    log.append(`${filename} saved`);
  } catch (e) {
    throw Error(e);
  }
};

module.exports = UrlToJson;
