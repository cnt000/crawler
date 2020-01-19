require('dotenv').config();
const del = require('del');
const ProgressBar = require('./ProgressBar');
const ValidationRegex = require('./ValidationRegex');
const Crawler = require('./Crawler');
const GetPlpUrls = require('./GetPlpUrls');
const GetPdpUrls = require('./GetPdpUrls');
const GetImgsUrls = require('./GetImgsUrls');
const CollectPlpProducts = require('./CollectPlpProducts');
const CollectPdpProduct = require('./CollectPdpProduct');
const UrlToJson = require('./UrlToJson');
const UrlToBin = require('./UrlToBin');

const filenameFunc = (directory, filename) => id =>
  `${directory}/${filename}-${id}.json`;

const imageNameFunc = directory => filename => `${directory}/${filename}`;

const App = async ({
  doClean = false,
  doPlp = false,
  doPdp = false,
  doImg = false,
  delay = 0,
}) => {
  const Config = require('./Config')(ValidationRegex);

  if (doClean) {
    const deletedPaths = await del([`${Config.dataDir}/*`]);
    if (deletedPaths.length) {
      console.log(`Data files deleted from: ${deletedPaths}`);
    }
  }
  if (doPlp) {
    const bar = new ProgressBar('-', Config.plpPages, 50);
    bar.draw();
    const plpUrl = `${Config.baseUrl}${Config.plpUrl}`;
    const plpPagesList = GetPlpUrls(plpUrl, Config.plpPages);
    const directoryToSavePlps = `${Config.dataDir}${Config.plpDataDir}`;
    try {
      await Crawler.crawl(
        plpPagesList,
        UrlToJson,
        filenameFunc(directoryToSavePlps, 'page'),
        CollectPlpProducts,
        bar,
      );
    } catch (e) {
      console.log(e);
    }
    console.log(`Plps collected in: ${directoryToSavePlps}`);
  }

  if (doPdp) {
    const plpFilesPattern = `${Config.dataDir}${Config.plpDataDir}/*.json`;
    const pdpFilesList = await GetPdpUrls(Config.baseUrl, plpFilesPattern);
    const directoryToSavePdps = `${Config.dataDir}${Config.pdpDataDir}`;
    try {
      await Crawler.crawl(
        pdpFilesList,
        UrlToJson,
        filenameFunc(directoryToSavePdps, 'product'),
        CollectPdpProduct,
      );
    } catch (e) {
      console.log(e);
    }
    console.log(`Pdps collected in: ${directoryToSavePdps}`);
  }

  if (doImg) {
    const pdpFilesPattern = `${Config.dataDir}${Config.pdpDataDir}/*.json`;
    const imgsUrlsList = await GetImgsUrls(
      `${Config.baseUrl}${Config.imgsUrl}`,
      pdpFilesPattern,
    );
    const directoryToSaveImgs = `${Config.dataDir}${Config.imgDataDir}`;
    try {
      await Crawler.crawl(
        imgsUrlsList,
        UrlToBin,
        imageNameFunc(directoryToSaveImgs),
      );
    } catch (e) {
      console.log(e);
    }
    console.log(`Images collected in: ${directoryToSaveImgs}`);
  }
};

module.exports = App;
