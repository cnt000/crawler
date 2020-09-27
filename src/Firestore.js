const admin = require('firebase-admin');
const serviceAccount = require('../pungilandia-firebase-firebase-adminsdk-vnngg-f035cbe9c5.json');

const FirestoreInit = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  const db = admin.firestore();

  return db;
}

module.exports = { FirestoreInit };
