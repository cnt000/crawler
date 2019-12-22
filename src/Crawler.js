const Crawler = async (delay, pagesList, asyncFunc, filenameFunc, crawlFunc) => {
  for (let url of pagesList) {
    // FIXME inject = or / from caller
    const id = /=/.test(url) ? url.split('=').pop() : url.split('/').pop();
      await asyncFunc(delay, url, filenameFunc(id), crawlFunc);
  }
};

module.exports = Crawler;
