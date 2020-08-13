const fs = require('fs');

const Crawler = {
  crawl: async ({
    urlsList,
    callback,
    filename,
    crawler,
    progress,
    delay,
    overwrite,
  }) => {
    setTimeout(async () => {
      if (urlsList.length === 0) {
        return;
      }
      const url = urlsList.pop();
      const id = /=/.test(url) ? url.split('=').pop() : url.split('/').pop();
      const filenameWithId = filename(id);
      const fileExists = fs.existsSync(filenameWithId);
      console.time(url);
      try {
        if (!fileExists || overwrite) {
          await callback(url, filenameWithId, crawler);
        }
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
