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
const Log = require('./Log');

const createFileName = (directory, filename) => (id) =>
  `${directory}/${filename}-${id}.json`;

const imageNameFunc = (directory) => (filename) => `${directory}/${filename}`;

const App = async (params) => {
  const Config = require('./Config')(ValidationRegex);
  const log = new Log();
  return stoca(Config, log, params);
};

async function stoca(
  Config,
  log,
  {
    doClean = false,
    doPlp = false,
    doPdp = false,
    doImg = false,
    upClean = false,
    upPlp = false,
    upPdp = false,
    upImg = false,
    delay = 0,
    overwrite = false,
  },
) {
  let bar;
  let setup;

  // se settato un do, fai un metodfo col do
  // se settato un up, fai il metodo con up

  if (doClean) {
    const deletedPaths = await del([`${Config.dataDir}/*`]);
    if (deletedPaths.length) {
      log.append(`Data files deleted from: ${deletedPaths}`);
      log.print();
    }
  }
  if (doPlp) {
    const plpUrl = `${Config.baseUrl}${Config.plpUrl}`;
    const plpPagesList = GetPlpUrls(plpUrl, Config.plpPages);
    const directoryToSavePlps = `${Config.dataDir}${Config.plpDataDir}`;
    log.append(`I'm going to save ${plpPagesList.length} json files for plp`);
    log.print();
    setup = {
      what: ['Plp', directoryToSavePlps],
      urlsList: plpPagesList,
      callback: UrlToJson,
      filename: createFileName(directoryToSavePlps, 'page'),
      crawler: CollectPlpProducts,
      progress: bar,
      delay,
      overwrite,
    };
  }

  if (doPdp) {
    const directoryToSavePdps = `${Config.dataDir}${Config.pdpDataDir}`;
    const plpFilesPattern = `${Config.dataDir}${Config.plpDataDir}/*.json`;
    const pdpFilesList = await GetPdpUrls(Config.baseUrl, plpFilesPattern);
    if (pdpFilesList.length === 0) {
      throw Error('Plp files missing, please run --do plp first');
    }
    log.append(`I'm going to save ${pdpFilesList.length} json files for pdp`);
    log.print();
    setup = {
      what: ['Pdp', directoryToSavePdps],
      urlsList: pdpFilesList,
      callback: UrlToJson,
      filename: createFileName(directoryToSavePdps, 'product'),
      crawler: CollectPdpProduct,
      progress: bar,
      delay,
      overwrite,
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
    log.append(`I'm going to save ${imgsUrlsList.length} image files`);
    log.print();
    setup = {
      what: ['Images', directoryToSaveImgs],
      urlsList: imgsUrlsList,
      callback: UrlToBin,
      filename: imageNameFunc(directoryToSaveImgs),
      crawler: void 0, // FIXME
      progress: bar,
      delay,
      overwrite,
    };
  }
  try {
    bar = new ProgressBar(log, '=', setup.urlsList.length, '#', 100);
    const setupWithProgressbar = { ...setup, progress: bar };
    bar.draw();
    await Crawler.crawl(setupWithProgressbar);
    log.append(`${setup.what[0]} collected in: ${setup.what[1]}`);
    log.print();
  } catch (e) {
    console.log(e);
  }
}

module.exports = App;
