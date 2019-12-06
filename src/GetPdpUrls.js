const globby = require('globby');
const sortByNumberInFilename = require('./sortByNumberInFilename');
const { ReadFile } = require('./File');

const GetPdpUrls = async pdpPagesPattern => {
  const paths = await globby([pdpPagesPattern]);
  const orderedPaths = sortByNumberInFilename(paths);

  const plpFilesList = orderedPaths.map(
    async filename => await ReadFile(filename),
  );

  const pdpPagesList = await Promise.all(plpFilesList).then(files =>
    files.map(json => json.map(product => product.href)).flat(1),
  );

  return pdpPagesList;
};

module.exports = GetPdpUrls;
