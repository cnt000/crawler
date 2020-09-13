const { Storage } = require('@google-cloud/storage');
const path = require('path');

const GOOGLE_CLOUD_PROJECT_ID = 'pungilandia-gcs';
const GOOGLE_CLOUD_KEYFILE = '../../pungilandia-gcs-0d178b593aff.json';

const storage = new Storage({
  projectId: GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: GOOGLE_CLOUD_KEYFILE,
});

/**
 * Copy file from local to a GCS bucket.
 * Uploaded file will be made publicly accessible.
 *
 * @param {string} localFilePath
 * @param {string} bucketName
 * @param {Object} [options]
 * @return {Promise.<string>} - The public URL of the uploaded file.
 */
exports.copyFileToGCS = (localFilePath, bucketName, options) => {
  options = options || {};

  const bucket = storage.bucket(bucketName);
  const fileName = path.basename(localFilePath);
  const file = bucket.file(fileName);

  return bucket
    .upload(localFilePath, options)
    .then(() => file.makePublic())
    .then(() => exports.getPublicUrl(bucketName, fileName))
    .catch(err => console.log(err));
};

/**
 * Get public URL of a file. The file must have public access
 * @param {string} bucketName
 * @param {string} fileName
 * @return {string}
 */
exports.getPublicUrl = (bucketName, fileName) =>
  `https://storage.googleapis.com/${bucketName}/${fileName}`;

exports.copyFileToGCS('../../data/img/plei_nellii.jpg', 'pungi-assets', {
  destination: 'img/plei_nellii.jpg',
});
