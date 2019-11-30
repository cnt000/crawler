

const fs = require('fs');
const mkdirp = require('mkdirp');
const getDirName = require('path').dirname;

const SaveFile = async(filename, content) => {
  await mkdirp(getDirName(filename), function(err) {
    if (err) throw err;
  });
  await fs.writeFile(
    filename,
    content,
    {
      encoding: 'utf8',
      flag: 'w',
    },
    err => {
      if (err) throw err;
    },
  );
};

module.exports = SaveFile;
