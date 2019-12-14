const FetchToBuffer = require('./FetchToBuffer');
const { SaveFile } = require('./File');

const UrlToBin = async (url, filename, crawlFunc) => {
  try {
    const img = await FetchToBuffer(url);
    await SaveFile(filename, Buffer.from(img));
  } catch (e) {
    throw Error(e);
  }
};

module.exports = UrlToBin;
