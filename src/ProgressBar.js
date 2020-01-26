class ProgressBar {
  constructor(char, length, fullChar = '+', barLength = 6) {
    const charsToSkipRegex = '^[[\\^$.|?*+()]{1}$';
    const fullRegex = new RegExp(charsToSkipRegex);
    this.char = char;
    this.charSkipped = char;
    if (fullRegex.test(this.char)) {
      this.charSkipped = '\\' + this.char;
    }
    this.length = length;
    this.fullChar = fullChar;
    this.fullCharSkipped = fullChar;
    if (fullRegex.test(this.fullChar)) {
      this.fullCharSkipped = '\\' + this.fullChar;
    }
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
    }, 250);
  }

  isEmpty() {
    const emptyRegex = new RegExp(`^${this.charSkipped}+$`);
    return emptyRegex.test(this.bar);
  }

  isFull() {
    const fullRegex = new RegExp(`^${this.fullCharSkipped}+$`);
    return fullRegex.test(this.bar);
  }

  add() {
    this.bar = this.fullChar + this.bar.slice(0, -1);
    const intStep = Math.ceil(this.step) - 1;
    this.addOne(intStep);
  }

  addOne(remainingSteps) {
    setTimeout(() => {
      if (remainingSteps === 0) {
        return;
      }
      this.bar = this.fullChar + this.bar.slice(0, -1);
      remainingSteps = remainingSteps - 1;
      this.addOne(remainingSteps);
    }, 500);
  }
}

module.exports = ProgressBar;
