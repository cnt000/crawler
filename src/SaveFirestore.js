const admin = require('firebase-admin');
const serviceAccount = require('../pungilandia-firebase-firebase-adminsdk-vnngg-f035cbe9c5.json');

const SaveFirestore = async (filename, json) => {
  try {
    const docName = require('path').basename(filename).replace(".json", "");
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    const db = admin.firestore();
    const docRef = db.collection('products').doc(docName);
    await docRef.set(json);
    return;
  } catch (e) {
    throw Error(e);
  }
};

module.exports = { SaveFirestore };
