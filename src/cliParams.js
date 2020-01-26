const argv = require('yargs')
  .usage('Usage: $0 --do [clean|plp|pdp|img] --delay [seconds]')
  .demandOption(['do']).argv;

const base = {
  doClean: false,
  doPlp: false,
  doPdp: false,
  doImg: false,
};

const command = {
  clean: {
    ...base,
    doClean: true,
  },
  plp: {
    ...base,
    doPlp: true,
  },
  pdp: {
    ...base,
    doPdp: true,
  },
  img: {
    ...base,
    doImg: true,
  },
  undefined: base,
};

module.exports = { ...command[argv.do], delay: argv.delay || 0 };
