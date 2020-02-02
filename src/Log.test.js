const Log = require('./Log');

describe('Log class', () => {
  it('should collect one line', () => {
    const log = new Log();
    log.add('test 1');
    expect(log.text).toEqual('test 1\n');
  });
  it('should collect two lines', () => {
    const log = new Log();
    log.add('test 1');
    log.add('test 2');
    expect(log.text).toEqual('test 1\ntest 2\n');
  });
  it('should print() call console.log', () => {
    const log = new Log();
    const mock = jest.spyOn(console, 'log');
    log.add('test 1');
    log.print();
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
