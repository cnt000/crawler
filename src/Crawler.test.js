const Crawler = require('./Crawler');

let urlsList = '';
let callback;

describe('Crawler', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    urlsList = ['http://www.test.it', 'http://www.test.com'];
    callback = jest.fn();
  });

  it('should call setTimeout', async () => {
    const setup = {
      what: [],
      urlsList,
      callback: jest.fn(),
      filename: jest.fn(),
      crawler: jest.fn(),
      progress: { add: () => {} },
      delay: 0,
    };
    await Crawler.crawl(setup);
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });
  it('should call asyncF', async () => {
    const setup = {
      what: [],
      urlsList,
      callback,
      filename: jest.fn(),
      crawler: jest.fn(),
      progress: { add: () => {} },
      delay: 0,
    };
    await Crawler.crawl(setup);
    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalledTimes(1);
  });
  /* it('should call crawler recursively if list is not empty', async () => {
    const filenameF = jest.fn();
    const asyncF = jest.fn();
    const crawlF = jest.fn();
    const mock = jest.spyOn(Crawler, 'crawl');
    await Crawler.crawl([1, 2, 3], asyncF, filenameF, crawlF);
    jest.runOnlyPendingTimers();
    expect(mock).toHaveBeenCalledTimes(1);
    jest.runOnlyPendingTimers();
    expect(mock).toHaveBeenCalledTimes(2);
    jest.runOnlyPendingTimers();
    expect(mock).toHaveBeenCalledTimes(1);
  });*/
  it('should not call asyncF if list is empty', async () => {
    const setup = {
      what: [],
      urlsList: [],
      callback,
      filename: jest.fn(),
      crawler: jest.fn(),
      progress: { add: () => {} },
      delay: 0,
    };
    await Crawler.crawl(setup);
    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalledTimes(0);
  });
  // it('should reject promise if missing function', async () => {
  //   const c = await Crawler.crawl();
  //   jest.runOnlyPendingTimers();
  //   expect(c).rejects.toThrow();
  // });
  it('should have been called with all parameters', async () => {
    callback.mockReset();
    const urlList = ['http://www.test.com?id=2'];
    const filenameF = jest.fn(() => 'test2');
    const crawlF = jest.fn();
    const setup = {
      what: [],
      urlsList: urlList,
      callback,
      filename: filenameF,
      crawler: jest.fn(),
      progress: false,
      delay: 0,
    };
    await Crawler.crawl(setup);
    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalledWith(
      'http://www.test.com?id=2',
      'test2',
      crawlF,
    );
  });
  it('should use last = in the url for the number', async () => {
    const urlList = ['http://www.test.it/test?id=1'];
    const filenameF = jest.fn(() => 'test');
    const setup = {
      what: [],
      urlsList: urlList,
      callback,
      filename: filenameF,
      crawler: jest.fn(),
      progress: { add: () => {} },
      delay: 0,
    };
    await Crawler.crawl(setup);
    jest.runOnlyPendingTimers();
    expect(filenameF).toHaveBeenCalledWith('1');
  });
  it('should use last / in the url for the number', async () => {
    const urlList = ['http://www.test.it/first/second/last.jpg'];
    const filenameF = jest.fn(() => 'test');
    const setup = {
      what: [],
      urlsList: urlList,
      callback,
      filename: filenameF,
      crawler: jest.fn(),
      progress: { add: () => {} },
      delay: 0,
    };
    await Crawler.crawl(setup);
    jest.runOnlyPendingTimers();
    expect(filenameF).toHaveBeenCalledWith('last.jpg');
  });
  it.only('should use all parameters', async () => {
    callback.mockReset();
    const urlList = ['http://www.test.com?id=98989'];
    const filenameF = jest.fn(() => 'test');
    const setup = {
      what: [],
      urlsList: urlList,
      callback,
      filename: filenameF,
      crawler: jest.fn(),
      progress: false,
      delay: 0,
    };
    await Crawler.crawl(setup);
    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalledWith(
      'http://www.test.com?id=98989',
      'test',
      jest.fn(),
    );
  });
  it('should call setTimeout with a function, with 1000 ms', async () => {
    const filenameF = jest.fn(() => 'test');
    const setup = {
      what: [],
      urlsList,
      callback,
      filename: filenameF,
      crawler: jest.fn(),
      progress: { add: () => {} },
      delay: 1000,
    };
    await Crawler.crawl(setup);
    jest.advanceTimersByTime(2000);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });
});
