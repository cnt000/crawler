const Crawler = async (pagesList, asyncFunc, filenameFunc, crawlFunc) => {
  console.time();
  const intervalId = setInterval(async () => {
    const url = pagesList.pop();
    const id = /=/.test(url) ? url.split('=').pop() : url.split('/').pop();
    console.timeLog(url);
    await asyncFunc(url, filenameFunc(id), crawlFunc);
    if (pagesList.length === 0) {
      clearInterval(intervalId);
    }
  }, 1000);
};

module.exports = Crawler;
