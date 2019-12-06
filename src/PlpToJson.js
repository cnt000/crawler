const FetchToText = require('./FetchToText');
const CollectPlpProducts = require('./CollectPlpProducts');
const { SaveFile } = require('./File');

const PlpToJson = async (url, dataDir, index) => {
  try {
    const filename = `${dataDir}/plp/page-${index}.json`;
    const html = await FetchToText(url);
    const plpProducts = CollectPlpProducts(html, index);
    const plpJson = JSON.stringify(plpProducts, null, 2);
    await SaveFile(filename, plpJson);
  } catch (e) {
    throw Error(e);
  }
};

module.exports = PlpToJson;
