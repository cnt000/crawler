const argv = require('yargs')
  .usage(`Usage: $0 --do [clean|plp|pdp|img] --delay [seconds] --overwrite
--up [clean|plp|pdp|img]`).argv;

const base = {
  doClean: false,
  doPlp: false,
  doPdp: false,
  doImg: false,
  upClean: false,
  upPlp: false,
  upPdp: false,
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
  undefined: base,
};

const commandUp = {
  clean: {
    ...base,
    upClean: true,
  },
  plp: {
    ...base,
    upPlp: true,
  },
  pdp: {
    ...base,
    upPdp: true,
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
  overwrite: argv.overwrite || false,
};
