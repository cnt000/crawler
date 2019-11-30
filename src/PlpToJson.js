

const FetchToText = require('./FetchToText');
const CollectPlpProducts = require('./CollectPlpProducts');
const SaveFile = require('./SaveFile');

const PlpToJson = async(url, index) => {
  try {
    const html = await FetchToText(url);
    const plpProducts = CollectPlpProducts(html, index);
    const plpJson = JSON.stringify(plpProducts, null, 2);
    const filename = `./data/plp/page-${index}.json`;
    await SaveFile(filename, plpJson);
  } catch (e) {
    throw Error(e);
  }
};

module.exports = PlpToJson;
