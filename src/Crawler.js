const Crawler = {
  crawl: async ({
    what,
    urlsList,
    callback,
    filename,
    crawler,
    progress,
    delay,
  }) => {
    setTimeout(async () => {
      if (urlsList.length === 0) {
        return;
      }
      const url = urlsList.pop();
      const id = /=/.test(url) ? url.split('=').pop() : url.split('/').pop();
      const filenameWithId = filename(id);
      console.time(url);
      try {
        await callback(url, filenameWithId, crawler, what[0]);
      } catch (e) {
        throw Error(e);
      }
      if (progress) {
        progress.add();
      }
      await Crawler.crawl({
        what,
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
