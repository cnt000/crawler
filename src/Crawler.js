const Crawler = {
  crawl: async (pagesList, asyncFunc, filenameFunc, crawlFunc, bar, delay) => {
    setTimeout(async () => {
      if (pagesList.length === 0) {
        return 'done';
      }
      const url = pagesList.pop();
      const id = /=/.test(url) ? url.split('=').pop() : url.split('/').pop();
      console.time(url);
      await asyncFunc(url, filenameFunc(id), crawlFunc);
      if (bar) {
        bar.add();
      }
      await Crawler.crawl(pagesList, asyncFunc, filenameFunc, crawlFunc, bar, delay);
    }, delay);
  },
};

module.exports = Crawler;
