const { SaveFirestore } = require("./SaveFirestore");

const Save = async (filename, content) => {
  try {
    // const saved = await SaveFile(filename, content);
    const saved = await SaveFirestore(filename, content);
    return saved;
  } catch (e) {
    throw Error(e);
  }
};

module.exports = { Save };
