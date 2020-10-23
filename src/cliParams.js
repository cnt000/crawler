const argv = require('yargs')
  .usage(`Usage: $0 --do [clean|plp|pdp|img|algolia] --delay [seconds]
--up [clean|img]`).argv;

const base = {
  doClean: false,
  doPlp: false,
  doPdp: false,
  doImg: false,
  doAlgolia: false,
  upClean: false,
  upImg: false,
};

const commandDo = {
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
  algolia: {
    ...base,
    doAlgolia: true,
  },
  undefined: base,
};

const commandUp = {
  clean: {
    ...base,
    upClean: true,
  },
  img: {
    ...base,
    upImg: true,
  },
  undefined: base,
};

module.exports = {
  doParam: commandDo[argv.do],
  upParam: commandUp[argv.up],
  delay: argv.delay || 0,
};
