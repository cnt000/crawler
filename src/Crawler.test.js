const Crawler = require('./Crawler');

describe('Crawler', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  const urlList = ['http://www.test.it', 'http://www.test.com'];

  it('should resolve promise called', async () => {
    const filenameF = jest.fn();
    const asyncF = jest.fn();
    const crawlF = jest.fn();
    await Crawler(urlList, asyncF, filenameF, crawlF);
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
    await Crawler(urlList, asyncF, filenameF, crawlF);
    expect(asyncF).toHaveBeenCalledWith(
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
    await Crawler(urlList, asyncF, filenameF, crawlF);
    expect(filenameF).toHaveBeenCalledWith('1');
  });
  it('should use last / in the url for the number', async () => {
    const urlList = ['http://www.test.it/first/second/last.jpg'];
    const filenameF = jest.fn();
    const asyncF = jest.fn();
    const crawlF = jest.fn();
    await Crawler(urlList, asyncF, filenameF, crawlF);
    expect(filenameF).toHaveBeenCalledWith('last.jpg');
  });
  it('should use delay parameter', async () => {
    const urlList = ['http://www.test-delay.com?id=98989'];
    const filenameF = jest.fn();
    const asyncF = jest.fn();
    const crawlF = jest.fn();
    await Crawler(urlList, asyncF, filenameF, crawlF);
    expect(asyncF).toHaveBeenLastCalledWith(
      urlList[0],
      filenameF('mock'),
      crawlF,
    );
  });
});
