const fsPromises = require('fs').promises; // or require('fs/promises') in v10.0.0

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

module.exports = ReadFile;
