const ProgressBar = require('./ProgressBar');

describe('progressBar', () => {
  it('should skip special character for empty char', () => {
    const progressBar = new ProgressBar('$', 4, '*', 4);
    expect(progressBar.isEmpty()).toBe(true);
    expect(progressBar.isFull()).toBe(false);
  });
  it('should return empty=true, full=false after creation', () => {
    const progressBar = new ProgressBar('-', 4, '+', 4);
    expect(progressBar.isEmpty()).toBe(true);
    expect(progressBar.isFull()).toBe(false);
  });
  it('should return empty=false, full=false  after first add', () => {
    const progressBar = new ProgressBar('-', 4, '+', 4);
    progressBar.add();
    expect(progressBar.isEmpty()).toBe(false);
    expect(progressBar.isFull()).toBe(false);
  });
  it('should return empty=false, full=true  after first add', () => {
    const progressBar = new ProgressBar('-', 4, '+', 4);
    progressBar.bar = '++++';
    expect(progressBar.isEmpty()).toBe(false);
    expect(progressBar.isFull()).toBe(true);
  });
  it('should add first progress char', () => {
    const progressBar = new ProgressBar('-', 4, '+', 4);
    progressBar.add();
    expect(progressBar.bar).toEqual('+---');
    expect(progressBar.isEmpty()).not.toBe(true);
  });
  it('should add second progress char', () => {
    const progressBar = new ProgressBar('-', 6);
    progressBar.add();
    progressBar.add();
    expect(progressBar.bar).toEqual('++----');
  });
  it('should add second progress char', () => {
    const progressBar = new ProgressBar('-', 6);
    progressBar.add();
    progressBar.add();
    expect(progressBar.bar).toEqual('++----');
  });
  it('should call setInterval to draw bar', () => {
    jest.useFakeTimers();
    const progressBar = new ProgressBar('-', 6);
    const mock = jest.spyOn(console, 'log');
    progressBar.draw();
    expect(setInterval).toHaveBeenCalledTimes(1);
    jest.runOnlyPendingTimers();
    expect(mock).toHaveBeenCalledTimes(1);
  });
  it('should call clearInterval when it is full', () => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    const progressBar = new ProgressBar('-', 2, '+', 2);
    progressBar.bar = '++';
    expect(progressBar.isFull()).toBe(true);
    progressBar.draw();
    jest.runOnlyPendingTimers();
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(clearInterval).toHaveBeenCalledTimes(1);
  });
  it('should stop if isFull', () => {
    const progressBar = new ProgressBar('-', 3, '+', 3);
    progressBar.add();
    progressBar.add();
    progressBar.add();
    expect(progressBar.bar).toEqual('+++');
    expect(progressBar.isFull()).toBe(true);
  });
  it('should add step and stay coherent with barLength', () => {
    const progressBar = new ProgressBar('-', 20, '+', 50);
    progressBar.add();
    jest.runOnlyPendingTimers();
    expect(progressBar.bar).toEqual(
      '++------------------------------------------------',
    );
    expect(progressBar.isEmpty()).not.toBe(true);
  });
  it('should add step without round, before last add', () => {
    const progressBar = new ProgressBar('-', 10, '+', 20);
    progressBar.add();
    jest.runOnlyPendingTimers();
    progressBar.add();
    jest.runOnlyPendingTimers();
    progressBar.add();
    jest.runOnlyPendingTimers();
    progressBar.add();
    jest.runOnlyPendingTimers();
    progressBar.add();
    jest.runOnlyPendingTimers();
    progressBar.add();
    jest.runOnlyPendingTimers();
    progressBar.add();
    jest.runOnlyPendingTimers();
    progressBar.add();
    jest.runOnlyPendingTimers();
    progressBar.add();
    jest.runOnlyPendingTimers();
    expect(progressBar.bar).toEqual('++++++++++++++++++--');
    expect(progressBar.isEmpty()).not.toBe(true);
  });
  it('should show full bar', () => {
    const progressBar = new ProgressBar('-', 5, '+', 10);
    progressBar.add();
    jest.runOnlyPendingTimers();
    progressBar.add();
    jest.runOnlyPendingTimers();
    progressBar.add();
    jest.runOnlyPendingTimers();
    progressBar.add();
    jest.runOnlyPendingTimers();
    progressBar.add();
    jest.runOnlyPendingTimers();
    expect(progressBar.bar).toEqual('++++++++++');
    expect(progressBar.isFull()).toBe(true);
  });
  it('should add step with round, before last add', () => {
    const progressBar = new ProgressBar('-', 7, '+', 17);
    progressBar.add();
    jest.runOnlyPendingTimers();
    progressBar.add();
    jest.runOnlyPendingTimers();
    progressBar.add();
    jest.runOnlyPendingTimers();
    progressBar.add();
    jest.runOnlyPendingTimers();
    progressBar.add();
    jest.runOnlyPendingTimers();
    progressBar.add();
    jest.runOnlyPendingTimers();
    progressBar.add();
    jest.runOnlyPendingTimers();
    expect(progressBar.bar).toEqual('+++++++++++++++++');
    expect(progressBar.isFull()).toBe(true);
  });
});
