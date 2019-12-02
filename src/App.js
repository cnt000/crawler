require('dotenv').config();
const GeneratePlpUrls = require('./GeneratePlpUrls');
const ValidationRegex = require('./ValidationRegex');
const PlpCrawler = require('./PlpCrawler');
const PlpToJson = require('./PlpToJson');

const App = async () => {
  const Config = require('./Config')(ValidationRegex);
  const plpUrl = `${Config.baseUrl}${Config.plpUrl}`;
  const plpPagesList = GeneratePlpUrls(plpUrl, Config.plpPages);
  // clean data dir
  await PlpCrawler(plpPagesList, Config.dataDir, PlpToJson);
};

module.exports = App;
