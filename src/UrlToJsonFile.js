const { FetchToText } = require('./FetchTo');
const { SaveFile } = require('./File');

const UrlToJsonFile = async (url, filename, crawlFunc) => {
  try {
    const html = await FetchToText(url);
    const dataFromWebpage = crawlFunc(html, filename);
    const json = JSON.stringify(dataFromWebpage, null, 2);
    await SaveFile(filename, json);
  } catch (e) {
    throw Error(e);
  }
};

module.exports = UrlToJsonFile;
