

const PlpCrawler = async(pagesList, asyncFunction) => {
  let i = 0;
  for (let url of pagesList) {
    await asyncFunction(url, i++);
  }
};

module.exports = PlpCrawler;
