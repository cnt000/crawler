

const PlpCrawler = async(pagesList, dataDir, asyncFunction) => {
  let i = 0;
  for (let url of pagesList) {
    await asyncFunction(url, dataDir, i++);
  }
};

module.exports = PlpCrawler;
