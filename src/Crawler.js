const Crawler = {
  crawl: async ({ urlsList, callback, filename, crawler, progress, delay }) => {
    setTimeout(async () => {
      if (urlsList.length === 0) {
        return;
      }
      const url = urlsList.pop();
      const id = /=/.test(url) ? url.split('=').pop() : url.split('/').pop();
      console.time(url);
      try {
        await callback(url, filename(id), crawler);
      } catch (e) {
        throw Error(e);
      }
      if (progress) {
        progress.add();
      }
      await Crawler.crawl({
        urlsList,
        callback,
        filename,
        crawler,
        progress,
        delay,
      });
    }, delay * 1000);
  },
};

module.exports = Crawler;
