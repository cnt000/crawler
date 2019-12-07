require('dotenv').config();
const del = require('del');
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
  const deletedPaths = await del([`${Config.dataDir}/*`]);
  console.log(`Test file deleted: ${deletedPaths}`);

  const plpUrl = `${Config.baseUrl}${Config.plpUrl}`;
  const plpPagesList = GetPlpUrls(plpUrl, Config.plpPages);
  const directoryToSavePlps = `${Config.dataDir}${Config.plpDataDir}`;
  await Crawler(
    plpPagesList,
    PlpToJson,
    filenameFunc(directoryToSavePlps, 'page'),
    CollectPlpProducts,
  );
  console.log(`Plps collected in: ${directoryToSavePlps}`);

  const plpFilesPattern = `${Config.dataDir}${Config.plpDataDir}/*.json`;
  const pdpFilesList = await GetPdpUrls(Config.baseUrl, plpFilesPattern);
  const directoryToSavePdps = `${Config.dataDir}${Config.pdpDataDir}`;
  await Crawler(
    pdpFilesList,
    PlpToJson,
    filenameFunc(directoryToSavePdps, 'product'),
    CollectPdpProducts,
  );
  console.log(`Pdps collected in: ${directoryToSavePdps}`);
};

module.exports = App;
