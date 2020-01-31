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

const createFileName = (directory, filename) => id =>
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
  let bar;
  let setup;

  if (doClean) {
    const deletedPaths = await del([`${Config.dataDir}/*`]);
    if (deletedPaths.length) {
      console.log(`Data files deleted from: ${deletedPaths}`);
    }
  }
  if (doPlp) {
    const plpUrl = `${Config.baseUrl}${Config.plpUrl}`;
    const plpPagesList = GetPlpUrls(plpUrl, Config.plpPages);
    const directoryToSavePlps = `${Config.dataDir}${Config.plpDataDir}`;
    setup = {
      what: ['Plp', directoryToSavePlps],
      urlsList: plpPagesList,
      callback: UrlToJson,
      filename: createFileName(directoryToSavePlps, 'page'),
      crawler: CollectPlpProducts,
      progress: bar,
      delay,
    };
  }

  if (doPdp) {
    const directoryToSavePdps = `${Config.dataDir}${Config.pdpDataDir}`;
    const plpFilesPattern = `${Config.dataDir}${Config.plpDataDir}/*.json`;
    const pdpFilesList = await GetPdpUrls(Config.baseUrl, plpFilesPattern);
    if (pdpFilesList.length === 0) {
      throw Error('Plp files missing, please run --do plp first');
    }
    console.log(`I'm going to save ${pdpFilesList.length} json files for pdp`);
    setup = {
      what: ['Pdp', directoryToSavePdps],
      urlsList: pdpFilesList,
      callback: UrlToJson,
      filename: createFileName(directoryToSavePdps, 'product'),
      crawler: CollectPdpProduct,
      progress: bar,
      delay,
    };
  }

  if (doImg) {
    const directoryToSaveImgs = `${Config.dataDir}${Config.imgDataDir}`;
    const pdpFilesPattern = `${Config.dataDir}${Config.pdpDataDir}/*.json`;
    const imgsUrlsList = await GetImgsUrls(
      `${Config.baseUrl}${Config.imgsUrl}`,
      pdpFilesPattern,
    );
    if (imgsUrlsList.length === 0) {
      throw Error('Pdp files missing, please run --do pdp first');
    }
    setup = {
      what: ['Images', directoryToSaveImgs],
      urlsList: imgsUrlsList,
      callback: UrlToBin,
      filename: imageNameFunc(directoryToSaveImgs),
      crawler: void 0, // FIXME
      progress: bar,
      delay,
    };
  }
  try {
    bar = new ProgressBar('=', setup.urlsList.length, '#', 100);
    const setupWithProgressbar = { ...setup, progress: bar };
    bar.draw();
    await Crawler.crawl(setupWithProgressbar);
    console.log(`${setup.what[0]} collected in: ${setup.what[1]}`);
  } catch (e) {
    console.log(e);
  }
};

module.exports = App;
