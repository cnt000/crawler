require('dotenv').config();
const globby = require('globby');
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
const {
  copyFileToGCS,
  deleteFromGCS,
} = require('./helpers/google-cloud-storage');

const createFileName = (directory, filename) => (id) =>
  `${directory}/${filename}-${id}.json`;

const imageNameFunc = (directory) => (filename) => `${directory}/${filename}`;

const App = async ({ doParam, upParam, delay = 0 }) => {
  const {
    doClean = false,
    doPlp = false,
    doPdp = false,
    doImg = false,
  } = doParam;
  const {
    upClean = false,
    upImg = false,
  } = upParam;
  const Config = require('./Config')(ValidationRegex);
  const log = new Log();

  const doCommand = doClean || doPlp || doPdp || doImg;
  const upCommand = upClean || upImg;
  let bar;
  let setup;

  if (doCommand) {
    if (doClean) {
      const deletedPaths = await del([`${Config.dataDir}/*`]);
      if (deletedPaths.length) {
        log.append(`Data files deleted from: ${deletedPaths}`);
      } else {
        log.append(`Nothing to deleted from: ${Config.dataDir}/*`);
      }
      log.print();
      return;
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
        log,
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
        log,
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
        crawler: void 0,
        progress: bar,
        delay,
      };
    }
    try {
      bar = new ProgressBar(log, '=', setup.urlsList.length, '#', 100);
      const setupWithProgressbar = { ...setup, progress: bar };
      bar.draw();
      await Crawler.crawl(setupWithProgressbar);
      log.append(`${setup.what[0]} collected in: ${setup.what[1]}`);
      log.print();
      if (doImg) {
        const { imageMini } = require('./helpers/imagemin');
        const imageFilesPattern = `${Config.dataDir}${Config.imgDataDir}/*.jpg`;
        const imageCompressedDir = `${Config.dataDir}${Config.compressedImgDir}`;
        const compressedFiles = await imageMini(
          imageFilesPattern,
          imageCompressedDir,
        );
        compressedFiles.map(({ destinationPath }) =>
          console.log(destinationPath),
        );
        log.append(
          `Images in ${imageFilesPattern} compressed id ${imageCompressedDir}`,
        );
      }
      log.print();
    } catch (e) {
      console.log(e);
    }
  }

  if (upCommand) {
    const bucket = 'pungi-assets';
    log.append(`I will upload files in universe of ${bucket}`);
    log.print();
    if (upClean) {
      deleteFromGCS('pungi-assets', 'img').catch(console.error);
      deleteFromGCS('pungi-assets', 'pdp').catch(console.error);
      deleteFromGCS('pungi-assets', 'plp').catch(console.error);
    }
    if (upImg) {
      const imgFilesPattern = `${Config.dataDir}${Config.compressedImgDir}/*.jpg`;
      const destinationFolder = `${Config.imgDataDir}`.substring(1);
      const paths = await globby([imgFilesPattern]);
      log.append(
        `I'm going to upload ${paths.length} image files to GCloud bucket: ${bucket}`,
      );
      log.print();
      paths.map((path) => {
        const file = require('path').basename(path);
        copyFileToGCS(path, bucket, {
          destination: `${destinationFolder}/${file}`,
        }).catch((e) => console.log(e));
        log.append(`I've uploaded ${path} ✌.|•͡˘‿•͡˘|.✌`);
        log.print();
      });
    }
    log.append('Finished to upload');
    log.print();
  }
};

module.exports = App;
