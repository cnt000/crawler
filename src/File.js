const mkdirp = require('mkdirp-promise');
const fsPromises = require('fs').promises;
const getDirName = require('path').dirname;

const ReadFile = async filename => {
  let json = '';
  try {
    const content = await fsPromises.readFile(filename, { encoding: 'utf8' });
    json = JSON.parse(content);
  } catch (e) {
    throw Error(e);
  }
  return json;
};

const SaveFile = async (filename, json) => {
  try {
    const content = JSON.stringify(json, null, 2);
    await mkdirp(getDirName(filename));
    await fsPromises.writeFile(filename, content, {
      flag: 'w',
    });
  } catch (e) {
    throw Error(e);
  }
};

module.exports = {
  ReadFile,
  SaveFile,
};
