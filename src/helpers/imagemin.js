const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');

exports.imageMini = async (filePattern, destination) => {
  const files = await imagemin([filePattern], {
    destination,
    plugins: [imageminMozjpeg({ quality: 80 })],
  });
  return files;
};
