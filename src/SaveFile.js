const mkdirp = require('mkdirp-promise');
const fsPromises = require('fs').promises; // or require('fs/promises') in v10.0.0
const getDirName = require('path').dirname;

const SaveFile = async (filename, content) => {
  try {
    await mkdirp(getDirName(filename));
    await fsPromises.writeFile(filename, content, {
      encoding: 'utf8',
      flag: 'w',
    });
  } catch (e) {
    throw Error(e);
  }
};

module.exports = SaveFile;
