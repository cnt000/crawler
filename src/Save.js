const { SaveFirestore } = require('./SaveFirestore');
const { SaveFile } = require('./File');

const Save = async (filename, content, type) => {
  try {
    let saved;
    if (type === 'pdp') {
      saved = await SaveFirestore(filename, content);
    } else {
      saved = await SaveFile(filename, content);
    }
    return saved;
  } catch (e) {
    throw Error(e);
  }
};

module.exports = { Save };
