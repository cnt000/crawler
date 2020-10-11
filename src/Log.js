class Log {
  constructor() {
    this.text = '';
    this.updatableText = '';
  }
  append(str) {
    this.text += `${str}\n`;
  }
  add(str) {
    this.updatableText = `${str}\n`;
  }
  print() {
    // process.stdout.write('\x1Bc');
    console.clear();
    console.log(`${this.text}\n${this.updatableText}`);
  }
}

module.exports = Log;
