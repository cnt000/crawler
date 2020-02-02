class Log {
  constructor() {
    this.text = '';
  }
  add(str) {
    this.text += `${str}\n`;
  }
  print() {
    // process.stdout.write('\x1Bc');
    console.log(this.text);
  }
}

module.exports = Log;
