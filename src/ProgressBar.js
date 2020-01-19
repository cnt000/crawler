class LoadBar {
  constructor(char, length, barLength = 6) {
    this.fullChar = '+';
    this.char = char;
    this.length = length;
    this.barLength = barLength;
    this.step = this.calculateLength();
    this.bar = Array(this.barLength)
      .fill(this.char)
      .join('');
  }

  calculateLength() {
    // this.length : 1 = this.barLength : x; -> step
    return this.barLength / this.length;
  }

  draw() {
    this.intervalId = setInterval(() => {
      process.stdout.write('\x1Bc');
      console.log(this.bar);
      if (this.isFull()) {
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  isEmpty() {
    const emptyRegex = new RegExp(`^${this.char}+$`);
    return emptyRegex.test(this.bar);
  }

  isFull() {
    const skippedFullRegex = '\\' + this.fullChar;
    const fullRegex = new RegExp(`^${skippedFullRegex}+$`);
    return fullRegex.test(this.bar);
  }

  add() {
    const intStep = Math.ceil(this.step);
    const progressStep = Array(intStep)
      .fill(this.fullChar)
      .join('');
    this.bar = progressStep + this.bar.slice(0, -intStep);
    this.bar = this.bar
      .padEnd(this.barLength, this.char)
      .substring(0, this.barLength);
  }
}

module.exports = LoadBar;
