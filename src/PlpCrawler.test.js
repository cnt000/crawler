const PlpCrawler = require('./PlpCrawler');

describe('PlpCrawler', () => {
  const urlList = ['http://www.test.it', 'http://www.test.com'];
  it('should resolve promise called', async() => {
    const asyncF = jest.fn();
    await PlpCrawler(urlList, './data', asyncF);
    expect(asyncF).toHaveBeenCalledTimes(2);
  });
  it('should reject promise if missing function', async() => {
    await expect(PlpCrawler(urlList)).rejects.toThrow();
  });
});
