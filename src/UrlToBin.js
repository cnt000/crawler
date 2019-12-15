const { FetchToBuffer } = require('./FetchTo');
const { SaveFile } = require('./File');

const UrlToBin = async (url, filename) => {
  try {
    const img = await FetchToBuffer(url);
    await SaveFile(filename, Buffer.from(img));
  } catch (e) {
    throw Error(e);
  }
};

module.exports = UrlToBin;
