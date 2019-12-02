require('dotenv').config();
const GeneratePlpUrls = require('./GeneratePlpUrls');
const ValidationRegex = require('./ValidationRegex');
const PlpCrawler = require('./PlpCrawler');
const PlpToJson = require('./PlpToJson');

const App = async() => {
  const Config = require('./Config')(ValidationRegex);
  const plpUrl = `${Config.baseUrl}${Config.plpUrl}`;
  const pagesList = GeneratePlpUrls(plpUrl, Config.plpPages);
  await PlpCrawler(pagesList, PlpToJson);
};

module.exports = App;
