const globby = require('globby');
const sortByNumberInFilename = require('./sortByNumberInFilename');
const { ReadFile } = require('./File');

const GetPdpUrls = async (domain, pdpPagesPattern) => {
  const paths = await globby([pdpPagesPattern]);
  const orderedPaths = sortByNumberInFilename(paths);

  const plpFilesList = orderedPaths.map(
    async filename => await ReadFile(filename),
  );

  console.log(plpFilesList);

  const pdpPagesList = await Promise.all(plpFilesList)
    .then(files =>
      files
        .map(json => json
          .filter(product => /[0-9]+$/.test(product.href))
          .map(product => `${domain}${product.href.slice(2)}`))
        .flat(1),
    );

  return pdpPagesList;
};

module.exports = GetPdpUrls;
