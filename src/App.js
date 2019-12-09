require('dotenv').config();
const del = require('del');
const ValidationRegex = require('./ValidationRegex');
const Crawler = require('./Crawler');
const GetPlpUrls = require('./GetPlpUrls');
const GetPdpUrls = require('./GetPdpUrls');
const CollectPlpProducts = require('./CollectPlpProducts');
const CollectPdpProduct = require('./CollectPdpProduct');
const UrlToJsonFile = require('./UrlToJsonFile');

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
    UrlToJsonFile,
    filenameFunc(directoryToSavePlps, 'page'),
    CollectPlpProducts,
  );
  console.log(`Plps collected in: ${directoryToSavePlps}`);

  const plpFilesPattern = `${Config.dataDir}${Config.plpDataDir}/*.json`;
  const pdpFilesList = await GetPdpUrls(Config.baseUrl, plpFilesPattern);
  const directoryToSavePdps = `${Config.dataDir}${Config.pdpDataDir}`;
  await Crawler(
    pdpFilesList,
    UrlToJsonFile,
    filenameFunc(directoryToSavePdps, 'product'),
    CollectPdpProduct,
  );
  console.log(`Pdps collected in: ${directoryToSavePdps}`);
};

module.exports = App;
