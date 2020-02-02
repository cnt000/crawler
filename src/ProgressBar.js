class ProgressBar {
  constructor(log, char, length, fullChar = '+', barLength = 6) {
    const charsToSkipRegex = '^[[\\^$.|?*+()]{1}$';
    const fullRegex = new RegExp(charsToSkipRegex);
    this.log = log;
    this.unit = 0;
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
    this.step = this.calculateSteps();
    this.bar = Array(this.barLength)
      .fill(this.char)
      .join('');
  }

  calculateSteps() {
    // this.length : 1 = this.barLength : x; -> step
    return this.barLength / this.length;
  }

  draw() {
    this.intervalId = setInterval(() => {
      this.log.add(this.bar);
      this.log.print();
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
    this.unit += this.step;
    if (this.unit >= 0.9999999999) {
      this.bar = this.fullChar + this.bar.slice(0, -1);
      this.unit = this.unit - 1.0;
      if (this.unit >= 1.0) {
        this.addOne(this.unit);
      }
    }
  }

  addOne(remainingSteps) {
    setTimeout(() => {
      this.bar = this.fullChar + this.bar.slice(0, -1);
      remainingSteps = remainingSteps - 1.0;
      if (remainingSteps < 1.0) {
        this.unit = remainingSteps;
      } else {
        this.addOne(remainingSteps);
      }
    }, 500);
  }
}

module.exports = ProgressBar;
