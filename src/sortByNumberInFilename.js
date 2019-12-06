const sortByNumberInFilename = files => files.sort(byNumberInFilename);

const byNumberInFilename = (a, b) => {
  const filenamePatternRegex = /-([0-9]+)\./;
  try {
    return (
      +a.match(filenamePatternRegex)[1] - +b.match(filenamePatternRegex)[1]
    );
  } catch (e) {
    throw Error('Some file have not -number.json pattern');
  }
};

module.exports = sortByNumberInFilename;
