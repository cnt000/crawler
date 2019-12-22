const Crawler = require('./Crawler');

describe('Crawler', () => {
  const urlList = ['http://www.test.it', 'http://www.test.com'];
  const delay = 0;
  it('should resolve promise called', async () => {
    const filenameF = jest.fn();
    const asyncF = jest.fn();
    const crawlF = jest.fn();
    await Crawler(delay, urlList, filenameF, asyncF, crawlF);
    expect(asyncF).toHaveBeenCalledTimes(2);
  });
  it('should reject promise if missing function', async () => {
    await expect(Crawler(urlList)).rejects.toThrow();
  });
  it('should use last = in the url for the number', async () => {
    const urlList = ['http://www.test.com?id=2'];
    const filenameF = jest.fn();
    const asyncF = jest.fn();
    const crawlF = jest.fn();
    await Crawler(delay, urlList, filenameF, asyncF, crawlF);
    expect(asyncF).toHaveBeenCalledWith('2');
  });
  it('should use last / in the url for the number', async () => {
    const urlList = ['http://www.test.it/first/second/last.jpg'];
    const filenameF = jest.fn();
    const asyncF = jest.fn();
    const crawlF = jest.fn();
    await Crawler(delay, urlList, filenameF, asyncF, crawlF);
    expect(asyncF).toHaveBeenCalledWith('last.jpg');
  });
  it('should use delay parameter', async () => {
    const delayFive = 5;
    const urlList = ['http://www.test-delay.com?id=0'];
    const filenameF = jest.fn();
    const asyncF = jest.fn();
    const crawlF = jest.fn();
    await Crawler(5, urlList, filenameF, asyncF, crawlF);
    expect(asyncF).toHaveBeenLastCalledWith(
      delayFive,
      urlList[0],
      filenameF,
      crawlF,
    );
  });
});
