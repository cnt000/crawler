const globby = require('globby');
const { ReadFile } = require('./File');

const GetImgUrls = async (imgUrl, pdpPagesPattern) => {
  const paths = await globby([pdpPagesPattern]);

  const pdpFilesList = paths.map(async filename => await ReadFile(filename));

  const imgsUrlList = await Promise.all(pdpFilesList).then(files =>
    files
      .map(product => `${imgUrl}${product.image}`)
      .flat(1),
  );

  return imgsUrlList;
};

module.exports = GetImgUrls;
