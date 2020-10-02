const Firestore = require('./Firestore');

const SaveFirestore = async (filename, json) => {
  try {
    const docName = require('path').basename(filename).replace('.json', '');
    await Firestore.db.collection('products').doc(docName).set(json);
    return;
  } catch (e) {
    throw Error(e);
  }
};

module.exports = { SaveFirestore };
