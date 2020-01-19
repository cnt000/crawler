class LoadBar {
  constructor(char, length, barLength = 6) {
    this.char = char;
    this.length = length;
    this.barLength = barLength;
    this.step = this.calculateLength();
    this.bar = Array(this.barLength)
      .fill(this.char)
      .join('');
  }

  calculateLength() {
    // this.length : 1 = this.barLength : x; -> 1 step
    return this.barLength / this.length;
  }

  draw() {
    this.intervalId = setInterval(() => {
      // process.stdout.write('\x1Bc');
      console.log(this.bar);
      if (this.isFull()) {
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  isEmpty() {
    return /^[-]+$/.test(this.bar); // fixme dynamic char -
  }

  isFull() {
    return !this.isEmpty();
  }

  add(fullChar) {
    const intStep = Math.ceil(this.step);
    const progressStep = Array(intStep)
      .fill(fullChar)
      .join('');
    this.bar = progressStep + this.bar.slice(0, -intStep);
    this.bar = this.bar
      .padEnd(this.barLength, this.char)
      .substring(0, this.barLength);
  }
}

module.exports = LoadBar;
