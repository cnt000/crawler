const { FetchToText } = require('./FetchTo');
const { Save } = require('./Save');

const UrlToJson = async (url, filename, crawlFunc) => {
  try {
    const html = await FetchToText(url);
    const dataFromWebpage = crawlFunc(html, filename);
    await Save(filename, dataFromWebpage);
    console.log(`${filename} saved`);
  } catch (e) {
    throw Error(e);
  }
};

module.exports = UrlToJson;
