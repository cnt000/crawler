const ProgressBar = require('./ProgressBar');

describe('ProgressBar', () => {
  it('should return empty=true, full=false after creation', () => {
    const progressbar = new ProgressBar('-', 4, 4);
    expect(progressbar.isEmpty()).toBe(true);
    expect(progressbar.isFull()).toBe(false);
  });
  it('should return empty=false, full=false  after first add', () => {
    const progressbar = new ProgressBar('-', 4, 4);
    progressbar.add('+');
    expect(progressbar.isEmpty()).toBe(false);
    expect(progressbar.isFull()).toBe(false);
  });
  it('should return empty=false, full=true  after first add', () => {
    const progressbar = new ProgressBar('-', 4, 4);
    progressbar.bar = '++++';
    expect(progressbar.isEmpty()).toBe(false);
    expect(progressbar.isFull()).toBe(true);
  });
  // it('should add first progress char', () => {
  //   const progressbar = new ProgressBar('-', 4, 4);
  //   progressbar.add('+');
  //   expect(progressbar.bar).toEqual('+---');
  //   expect(progressbar.isEmpty()).not.toBe(true);
  // });
  // it('should add second progress char', () => {
  //   const progressbar = new ProgressBar('-', 6);
  //   progressbar.add('+');
  //   progressbar.add('+');
  //   expect(progressbar.bar).toEqual('++----');
  // });
  // it('should add second progress char', () => {
  //   const progressbar = new ProgressBar('-', 6);
  //   progressbar.add('+');
  //   progressbar.add('+');
  //   expect(progressbar.bar).toEqual('++----');
  // });
  // it('should call setInterval to draw bar', () => {
  //   jest.useFakeTimers();
  //   const progressbar = new ProgressBar('-', 6);
  //   const mock = jest.spyOn(console, 'log');
  //   progressbar.draw();
  //   expect(setInterval).toHaveBeenCalledTimes(1);
  //   jest.runOnlyPendingTimers();
  //   expect(mock).toHaveBeenCalledTimes(1);
  // });
  it('should call clearInterval when it is full', () => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    const progressbar = new ProgressBar('-', 2, 2);
    progressbar.bar = '++';
    expect(progressbar.isFull()).toBe(true);
    progressbar.draw();
    jest.runOnlyPendingTimers();
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(clearInterval).toHaveBeenCalledTimes(1);
  });
  // it('should stop if isFull', () => {
  //   const progressbar = new ProgressBar('-', 3, 3);
  //   progressbar.add('+');
  //   progressbar.add('+');
  //   progressbar.add('+');
  //   expect(progressbar.bar).toEqual('+++');
  //   expect(progressbar.isFull()).toBe(true);
  // });
  // it('should add step and stay coherent with barLength', () => {
  //   const progressbar = new ProgressBar('-', 20, 50);
  //   progressbar.add('+');
  //   expect(progressbar.bar).toEqual(
  //     '+++-----------------------------------------------',
  //   );
  //   expect(progressbar.isEmpty()).not.toBe(true);
  // });
  // it('should add step without round, before last add', () => {
  //   const progressbar = new ProgressBar('-', 10, 50);
  //   progressbar.add('+');
  //   progressbar.add('+');
  //   progressbar.add('+');
  //   progressbar.add('+');
  //   progressbar.add('+');
  //   progressbar.add('+');
  //   progressbar.add('+');
  //   progressbar.add('+');
  //   progressbar.add('+');
  //   expect(progressbar.bar).toEqual(
  //     '+++++++++++++++++++++++++++++++++++++++++++++-----',
  //   );
  //   expect(progressbar.isEmpty()).not.toBe(true);
  // });
  // it('should add step without round, before last add', () => {
  //   const progressbar = new ProgressBar('-', 5, 30);
  //   progressbar.add('+');
  //   progressbar.add('+');
  //   progressbar.add('+');
  //   progressbar.add('+');
  //   progressbar.add('+');
  //   expect(progressbar.bar).toEqual('++++++++++++++++++++++++++++++');
  //   expect(progressbar.isFull()).toBe(true);
  // });
  // it('should add step with round, before last add', () => {
  //   const progressbar = new ProgressBar('-', 7, 17);
  //   progressbar.add('+');
  //   progressbar.add('+');
  //   progressbar.add('+');
  //   progressbar.add('+');
  //   progressbar.add('+');
  //   progressbar.add('+');
  //   progressbar.add('+');
  //   expect(progressbar.bar).toEqual('+++++++++++++++++');
  //   expect(progressbar.isFull()).toBe(true);
  // });
});
