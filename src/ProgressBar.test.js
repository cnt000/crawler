const ProgressBar = require('./ProgressBar');
const Log = require('./Log');
let log;

describe('progressBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    log = new Log();
  });
  it('should skip special character for empty char', () => {
    const progressBar = new ProgressBar(log, '$', 4, '*', 4);
    expect(progressBar.isEmpty()).toBe(true);
    expect(progressBar.isFull()).toBe(false);
  });
  it('should return empty=true, full=false after creation', () => {
    const progressBar = new ProgressBar(log, '-', 4, '+', 4);
    expect(progressBar.isEmpty()).toBe(true);
    expect(progressBar.isFull()).toBe(false);
  });
  it('should return empty=false, full=false  after first add', () => {
    const progressBar = new ProgressBar(log, '-', 4, '+', 4);
    addN(1, progressBar);
    expect(progressBar.isEmpty()).toBe(false);
    expect(progressBar.isFull()).toBe(false);
  });
  it('should return empty=false, full=true  after first add', () => {
    const progressBar = new ProgressBar(log, '-', 4, '+', 4);
    progressBar.bar = '++++';
    expect(progressBar.isEmpty()).toBe(false);
    expect(progressBar.isFull()).toBe(true);
  });
  it('should add first progress char', () => {
    const progressBar = new ProgressBar(log, '-', 4, 'a', 4);
    addN(1, progressBar);
    expect(progressBar.bar).toEqual('a---');
    expect(progressBar.isEmpty()).not.toBe(true);
  });
  it('should add second progress char', () => {
    const progressBar = new ProgressBar(log, '-', 6);
    addN(2, progressBar);
    expect(progressBar.bar).toEqual('++----');
  });
  it('should add second progress char', () => {
    const progressBar = new ProgressBar(log, '-', 6);
    addN(2, progressBar);
    expect(progressBar.bar).toEqual('++----');
  });
  it('should call setInterval to draw bar', () => {
    const progressBar = new ProgressBar(log, '-', 6);
    const mock = jest.spyOn(log, 'print');
    progressBar.draw();
    expect(setInterval).toHaveBeenCalledTimes(1);
    jest.runOnlyPendingTimers();
    expect(mock).toHaveBeenCalledTimes(1);
  });
  it('should call clearInterval when it is full', () => {
    const progressBar = new ProgressBar(log, '-', 2, '+', 2);
    progressBar.bar = '++';
    expect(progressBar.isFull()).toBe(true);
    progressBar.draw();
    jest.runOnlyPendingTimers();
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(clearInterval).toHaveBeenCalledTimes(1);
  });
  it('should stop if isFull', () => {
    const progressBar = new ProgressBar(log, '-', 3, '+', 3);
    addN(3, progressBar);
    expect(progressBar.bar).toEqual('+++');
    expect(progressBar.isFull()).toBe(true);
  });
  it('should add step and stay coherent with barLength', () => {
    const progressBar = new ProgressBar(log, '-', 20, '+', 50);
    addN(1, progressBar);
    expect(progressBar.bar).toEqual(
      drawProgressBar({
        emptyChar: '-',
        emptyCharLength: 48,
        fullChar: '+',
        fullCharLength: 2,
      }),
    );
    expect(progressBar.isEmpty()).not.toBe(true);
  });
  it('should add step without round, before last add', () => {
    const progressBar = new ProgressBar(log, '-', 10, '+', 20);
    addN(9, progressBar);
    expect(progressBar.bar).toEqual('++++++++++++++++++--');
    expect(progressBar.isEmpty()).not.toBe(true);
  });
  it('should show full bar', () => {
    const progressBar = new ProgressBar(log, '-', 5, '+', 10);
    addN(5, progressBar);
    expect(progressBar.bar).toEqual('++++++++++');
    expect(progressBar.isFull()).toBe(true);
  });
  it('should add step with round, before last add', () => {
    const progressBar = new ProgressBar(log, '-', 8, '+', 24);
    addN(9, progressBar);
    expect(progressBar.bar).toEqual('++++++++++++++++++++++++');
    expect(progressBar.isFull()).toBe(true);
  });
  it('should work 0.45 ratio bar length / list ', () => {
    const progressBar = new ProgressBar(log, '-', 110, '+', 50);
    addN(20, progressBar);
    expect(progressBar.bar).toEqual(
      drawProgressBar({
        emptyChar: '-',
        emptyCharLength: 41,
        fullChar: '+',
        fullCharLength: 9,
      }),
    );
  });
  it('should work 2.47 ratio bar length / list ', () => {
    const progressBar = new ProgressBar(log, '-', 24, '+', 59);
    addN(2, progressBar);
    expect(progressBar.bar).toEqual(
      drawProgressBar({
        emptyChar: '-',
        emptyCharLength: 55,
        fullChar: '+',
        fullCharLength: 4,
      }),
    );
  });
  it('should work 1.98 ratio bar length / list ', () => {
    const progressBar = new ProgressBar(log, '-', 101, '+', 200);
    addN(2, progressBar);
    expect(progressBar.bar).toEqual(
      drawProgressBar({
        emptyChar: '-',
        emptyCharLength: 197,
        fullChar: '+',
        fullCharLength: 3,
      }),
    );
  });
  it('should work 17/7 ratio, 17/7*7 = 16.99999999', () => {
    const progressBar = new ProgressBar(log, '-', 17, '+', 7);
    addN(17, progressBar);
    expect(progressBar.bar).toEqual(
      drawProgressBar({
        emptyChar: '-',
        emptyCharLength: 0,
        fullChar: '+',
        fullCharLength: 7,
      }),
    );
  });
});

function addN(n, progressBar) {
  Array(n)
    .fill(0)
    .forEach(_ => {
      progressBar.add();
      jest.runOnlyPendingTimers();
    });
}

function drawProgressBar({
  emptyChar,
  emptyCharLength,
  fullChar,
  fullCharLength,
}) {
  return (
    Array(fullCharLength)
      .fill(fullChar)
      .join('') +
    Array(emptyCharLength)
      .fill(emptyChar)
      .join('')
  );
}

// 7 e 17 arrotondare
