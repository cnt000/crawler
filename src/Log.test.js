const Log = require('./Log');

describe('Log class', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should collect one line', () => {
    const log = new Log();
    log.append('test 1');
    expect(log.text).toEqual('test 1\n');
  });
  it('should collect two lines', () => {
    const log = new Log();
    log.append('test 1');
    log.append('test 2');
    expect(log.text).toEqual('test 1\ntest 2\n');
  });
  it('should add line', () => {
    const log = new Log();
    log.add('line 1');
    expect(log.updatableText).toEqual('line 1\n');
  });
  it('should overwrite line 1 with line 2', () => {
    const log = new Log();
    log.add('line 1');
    expect(log.updatableText).toEqual('line 1\n');
    log.add('line 2');
    expect(log.updatableText).toEqual('line 2\n');
  });
  it('should print() call console.log', () => {
    const log = new Log();
    const mock = jest.spyOn(console, 'log');
    log.append('test 1');
    log.print();
    expect(mock).toHaveBeenCalledTimes(1);
  });
  it('should print() log appended lines and updated lines', () => {
    const log = new Log();
    const mock = jest.spyOn(console, 'log');
    log.append('test 1');
    log.append('test 2');
    log.add('line 1');
    log.add('line 2');
    log.print();
    expect(mock).toHaveBeenCalledWith('test 1\ntest 2\n\nline 2\n');
  });
});
