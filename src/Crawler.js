const Crawler = {
  crawl: async (pagesList, asyncFunc, filenameFunc, crawlFunc, bar) => {
    setTimeout(async () => {
      const url = pagesList.pop();
      const id = /=/.test(url) ? url.split('=').pop() : url.split('/').pop();
      await asyncFunc(url, filenameFunc(id), crawlFunc);
      bar.add('+');
      if (pagesList.length !== 0) {
        await Crawler.crawl(pagesList, asyncFunc, filenameFunc, crawlFunc, bar);
      }
    }, 1000);
  },
};

module.exports = Crawler;
