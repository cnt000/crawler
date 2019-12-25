const Crawler = require('./Crawler');

describe('Crawler', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  const urlList = ['http://www.test.it', 'http://www.test.com'];
  const delay = 0;
  it('should call setInterval 2 times', async () => {
    const filenameF = jest.fn();
    const asyncF = jest.fn();
    const crawlF = jest.fn();
    await Crawler(delay, urlList, asyncF, filenameF, crawlF);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), delay);
  });
  it('should resolve promise called', async () => {
    const filenameF = jest.fn();
    const asyncF = jest.fn();
    const crawlF = jest.fn();
    await Crawler(delay, urlList, asyncF, filenameF, crawlF);
    expect(asyncF).toHaveBeenCalledTimes(2);
  });
  it('should reject promise if missing function', async () => {
    await expect(Crawler(urlList)).rejects.toThrow();
  });
  it('should have been called with all parameters', async () => {
    const urlList = ['http://www.test.com?id=2'];
    const asyncF = jest.fn();
    const filenameF = jest.fn();
    const crawlF = jest.fn();
    await Crawler(delay, urlList, asyncF, filenameF, crawlF);
    expect(asyncF).toHaveBeenCalledWith(
      0,
      urlList[0],
      filenameF('mock'),
      crawlF,
    );
  });
  it('should use last = in the url for the number', async () => {
    const urlList = ['http://www.test.it/test?id=1'];
    const filenameF = jest.fn();
    const asyncF = jest.fn();
    const crawlF = jest.fn();
    await Crawler(delay, urlList, asyncF, filenameF, crawlF);
    expect(filenameF).toHaveBeenCalledWith('1');
  });
  it('should use last / in the url for the number', async () => {
    const urlList = ['http://www.test.it/first/second/last.jpg'];
    const filenameF = jest.fn();
    const asyncF = jest.fn();
    const crawlF = jest.fn();
    await Crawler(delay, urlList, asyncF, filenameF, crawlF);
    expect(filenameF).toHaveBeenCalledWith('last.jpg');
  });
  it('should use delay parameter', async () => {
    const delayFive = 5;
    const urlList = ['http://www.test-delay.com?id=98989'];
    const filenameF = jest.fn();
    const asyncF = jest.fn();
    const crawlF = jest.fn();
    await Crawler(5, urlList, asyncF, filenameF, crawlF);
    expect(asyncF).toHaveBeenLastCalledWith(
      delayFive,
      urlList[0],
      filenameF('mock'),
      crawlF,
    );
  });
});
