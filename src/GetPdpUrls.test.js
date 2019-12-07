const GetPdpUrls = require('./GetPdpUrls');

describe('GetPdpUrls', () => {
  // mock a directory with files, con degli href, e conta gli href
  it('should return an array length 5', async () => {
    expect(await GetPdpUrls('http://www.test.it/', './test/')).toEqual([]);
  });
});
