const { Storage } = require('@google-cloud/storage');
const path = require('path');

const GOOGLE_CLOUD_PROJECT_ID = 'pungilandia-gcs';
const GOOGLE_CLOUD_KEYFILE = './pungilandia-gcs-0d178b593aff.json';

const storage = new Storage({
  projectId: GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: GOOGLE_CLOUD_KEYFILE,
});

exports.copyFileToGCS = async (localFilePath, bucketName, options = {}) => {
  await storage
    .bucket(bucketName)
    .upload(localFilePath, options)
    .catch((err) => console.log(err));

  console.log(exports.getPublicUrl(bucketName, path.basename(localFilePath)));
};

exports.getPublicUrl = (bucketName, fileName) =>
  `https://storage.googleapis.com/${bucketName}/${fileName}`;

exports.deleteFromGCS = async (bucketName, prefix) => {
  await storage
    .bucket(bucketName)
    .deleteFiles({
      prefix,
    })
    .catch((err) => console.log(err));

  console.log(`gs://${bucketName}/${prefix}/* deleted.`);
};

// exports.copyFileToGCS('data/img/eupho_ob.jpg', 'pungi-assets', {
//   destination: 'img/plei_nellii.jpg',
// });

// exports.deleteFromGCS('pungi-assets', 'img').catch(console.error);
