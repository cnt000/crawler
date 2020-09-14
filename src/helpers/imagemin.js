const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');

(async () => {
  const files = await imagemin(['../../data/img/*.jpg'], {
    destination: '../../data/compressed-img',
    plugins: [imageminMozjpeg({ quality: 60 })],
  });
})();
