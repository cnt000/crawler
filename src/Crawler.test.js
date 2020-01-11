const Crawler = require('./Crawler');

let urlList = '';

describe('Crawler', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    urlList = ['http://www.test.it', 'http://www.test.com'];
  });

  it('should call setTimeout', async () => {
    const filenameF = jest.fn();
    const asyncF = jest.fn();
    const crawlF = jest.fn();
    await Crawler.crawl(urlList, asyncF, filenameF, crawlF);
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });
  it('should call asyncF', async () => {
    const filenameF = jest.fn();
    const asyncF = jest.fn();
    const crawlF = jest.fn();
    await Crawler.crawl(urlList, asyncF, filenameF, crawlF);
    jest.runOnlyPendingTimers();
    expect(asyncF).toHaveBeenCalledTimes(1);
  });
  it('should call crawler recursively if list is not empty', async () => {
    const filenameF = jest.fn();
    const asyncF = jest.fn();
    const crawlF = jest.fn();
    const mock = jest.spyOn(Crawler, 'crawl');
    await Crawler.crawl([1, 2, 3], asyncF, filenameF, crawlF);
    jest.runOnlyPendingTimers();
    expect(mock).toHaveBeenCalledTimes(3);
  });
  it('should not call crawler if list is empty', async () => {
    const filenameF = jest.fn();
    const asyncF = jest.fn(() => console.log('asynF DENTRO'));
    const crawlF = jest.fn();
    await Crawler.crawl([], asyncF, filenameF, crawlF);
    jest.runOnlyPendingTimers();
    expect(Crawler).toHaveBeenCalledTimes(0);
  });
  // it('should reject promise if missing function', async () => {
  //   const mock = jest.spyOn(Crawler, 'crawl');
  //   await Crawler.crawl(urlList);
  //   jest.runOnlyPendingTimers();
  //   expect(mock).rejects.toThrow();
  // });
  // it('should have been called with all parameters', async () => {
  //   const urlList = ['http://www.test.com?id=2'];
  //   const asyncF = jest.fn();
  //   const filenameF = jest.fn();
  //   const crawlF = jest.fn();
  //   await Crawler.crawl(urlList, asyncF, filenameF, crawlF);
  //   expect(asyncF).toHaveBeenCalledWith(urlList[0], filenameF('mock'), crawlF);
  // });
  // it('should use last = in the url for the number', async () => {
  //   const urlList = ['http://www.test.it/test?id=1'];
  //   const filenameF = jest.fn();
  //   const asyncF = jest.fn();
  //   const crawlF = jest.fn();
  //   await Crawler.crawl(urlList, asyncF, filenameF, crawlF);
  //   expect(filenameF).toHaveBeenCalledWith('1');
  // });
  // it('should use last / in the url for the number', async () => {
  //   const urlList = ['http://www.test.it/first/second/last.jpg'];
  //   const filenameF = jest.fn();
  //   const asyncF = jest.fn();
  //   const crawlF = jest.fn();
  //   jest.runOnlyPendingTimers();
  //   await Crawler.crawl(urlList, asyncF, filenameF, crawlF);
  //   expect(filenameF).toHaveBeenCalledWith('last.jpg');
  // });
  // it('should use all parameters', async () => {
  //   const urlList = ['http://www.test.com?id=98989'];
  //   const filenameF = jest.fn();
  //   const asyncF = jest.fn();
  //   const crawlF = jest.fn();
  //   await Crawler.crawl(urlList, asyncF, filenameF, crawlF);
  //   expect(asyncF).toHaveBeenLastCalledWith(
  //     urlList[0],
  //     filenameF('mock'),
  //     crawlF,
  //   );
  // });
  // it('should call setInterval 2 times', async () => {
  //   const filenameF = jest.fn();
  //   const asyncF = jest.fn();
  //   const crawlF = jest.fn();
  //   await Crawler.crawl(urlList, asyncF, filenameF, crawlF);
  //   jest.advanceTimersByTime(1000);
  //   expect(setInterval).toHaveBeenCalledTimes(1);
  //   expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  // });
});
