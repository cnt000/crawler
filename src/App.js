require('dotenv').config();
const globby = require('globby');
const GeneratePlpUrls = require('./GeneratePlpUrls');
const ValidationRegex = require('./ValidationRegex');
const PlpCrawler = require('./PlpCrawler');
const PlpToJson = require('./PlpToJson');

// FIXME TEST
const byNumberInFilename = (a, b) => +a.match(/-([0-9]+)\./)[1] - +b.match(/-([0-9]+)\./)[1];

const App = async () => {
  const Config = require('./Config')(ValidationRegex);
  const plpUrl = `${Config.dataDir}${Config.plpUrl}`;
  const plpPagesList = GeneratePlpUrls(plpUrl, Config.plpPages);
  // clean data dir
  await PlpCrawler(plpPagesList, Config.dataDir, PlpToJson);
  const paths = await globby([`${Config.dataDir}${Config.plpDataDir}/*.json`]);
  console.log(paths.sort(byNumberInFilename));
  // const pdpPagesList = paths
  //   .map(async filename => await readFile(filename))
  //   .map(json => json.href);
  // console.log(pdpPagesList);
  // await PdpCrawler(pdpPagesList, Config.dataDir, PlpToJson);
};

module.exports = App;
