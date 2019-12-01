const GeneratePlpUrls = (url, maxId) => {
  return [...Array(maxId).keys()].map(i => `${url}${i}`);
};

module.exports = GeneratePlpUrls;
