const { Storage } = require('@google-cloud/storage');
const fetch = require('node-fetch');

const GOOGLE_CLOUD_PROJECT_ID = 'pungilandia-gcs';
const GOOGLE_CLOUD_KEYFILE = './pungilandia-gcs-0d178b593aff.json';

const storage = new Storage({
  projectId: GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: GOOGLE_CLOUD_KEYFILE,
});

exports.copyFileToGCS = async (localFilePath, bucketName, { destination = localFilePath }) => {
  const fileExists = await fetch(exports.getPublicUrl(bucketName, `${destination}`), { method: 'HEAD' })
    .then(res => res.ok).catch(err => console.log('Error:', err));
  if (!fileExists) {
    await storage
      .bucket(bucketName)
      .upload(localFilePath, { destination })
      .catch((err) => {
        console.log(err.message)
      });
  }

  console.log(exports.getPublicUrl(bucketName, `${destination}`));
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
