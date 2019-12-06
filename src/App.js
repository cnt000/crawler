require('dotenv').config();
const GetPlpUrls = require('./GetPlpUrls');
const ValidationRegex = require('./ValidationRegex');
const PlpCrawler = require('./PlpCrawler');
const PlpToJson = require('./PlpToJson');
const GetPdpUrls = require('./GetPdpUrls');

const App = async () => {
  const Config = require('./Config')(ValidationRegex);
  // FIXME clean data dir

  // const plpUrl = `${Config.dataDir}${Config.plpUrl}`;
  // const plpPagesList = GetPlpUrls(plpUrl, Config.plpPages);
  // await PlpCrawler(plpPagesList, Config.dataDir, PlpToJson);
  // passare tutta la directory da fuori e chiamarlo Crawler

  const plpFilesPattern = `${Config.dataDir}${Config.plpDataDir}/*.json`;
  const pdpFilesList = await GetPdpUrls(plpFilesPattern);
  return pdpFilesList;
  // await PdpCrawler(pdpPagesList, Config.dataDir, PlpToJson);
};

module.exports = App;
