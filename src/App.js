require('dotenv').config();
const GetPlpUrls = require('./GetPlpUrls');
const ValidationRegex = require('./ValidationRegex');
const Crawler = require('./Crawler');
const PlpToJson = require('./PlpToJson');
const CollectPlpProducts = require('./CollectPlpProducts');
const CollectPdpProducts = require('./CollectPdpProducts');
const GetPdpUrls = require('./GetPdpUrls');

const filenameFunc = (directory, filename) => id =>
  `${directory}/${filename}-${id}.json`;

const App = async () => {
  const Config = require('./Config')(ValidationRegex);
  // FIXME clean data dir

  const plpUrl = `${Config.baseUrl}${Config.plpUrl}`;
  const plpPagesList = GetPlpUrls(plpUrl, Config.plpPages);
  const directoryToSavePlps = `${Config.dataDir}${Config.plpDataDir}`;
  await Crawler(
    plpPagesList,
    filenameFunc(directoryToSavePlps, 'page'),
    PlpToJson,
    CollectPlpProducts,
  );

  const plpFilesPattern = `${Config.dataDir}${Config.plpDataDir}/*.json`;
  const pdpFilesList = await GetPdpUrls(plpFilesPattern);
  const directoryToSavePdps = `${Config.dataDir}${Config.pdpDataDir}`;
  await Crawler(
    pdpFilesList,
    filenameFunc(directoryToSavePdps, 'product'),
    PlpToJson,
    CollectPdpProducts,
  );
};

module.exports = App;
