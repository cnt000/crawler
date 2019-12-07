// FIXME l'id non deve essere incrementale
const Crawler = async(pagesList, filenameFunc, asyncFunc, crawlFunc) => {
  let i = 0;
  for (let url of pagesList) {
    await asyncFunc(url, filenameFunc(i++), crawlFunc);
  }
};

module.exports = Crawler;
