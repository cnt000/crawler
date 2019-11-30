require('dotenv').config();
// const GeneratePlpUrls = require('./GeneratePlpUrls');
// const PlpCrawler = require('./PlpCrawler');
// const PlpToJson = require('./PlpToJson');
const ValidationRegex = require('./ValidationRegex');

const App = async() => {
  const Config = require('./Config')(ValidationRegex);
  // const plpUrl = `${Config.baseUrl}${Config.plpUrl}`;
  console.log(Config);

  // const pagesList = GeneratePlpUrls(plpUrl, Config.plpPages);
  // await PlpCrawler(pagesList, PlpToJson);
};

module.exports = App;
