// FIXME l'id non deve essere incrementale
const Crawler = async(pagesList, filenameFunc, asyncFunc, crawlFunc) => {
  for (let url of pagesList) {
    const id = url.split('=')[1];
    await asyncFunc(url, filenameFunc(id), crawlFunc);
  }
};

module.exports = Crawler;
