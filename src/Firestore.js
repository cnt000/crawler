const admin = require('firebase-admin');

const serviceAccount = require('../pungilandia2020-api-4218e7f41d32.json');

var db = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports.db = db.firestore();
