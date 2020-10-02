const fsPromises = require('fs').promises;
const globby = require('globby');
const GetPdpUrls = require('./GetPdpUrls');
jest.mock('globby');

describe('GetPdpUrls', () => {
  const content = [
    { href: '../test/index123' },
    { href: '../test/page456' },
    { href: '../test/endpoint789' },
  ];
  const result = [
    'http://www.test.it/test/index123',
    'http://www.test.it/test/page456',
    'http://www.test.it/test/endpoint789',
    'http://www.test.it/test/index123',
    'http://www.test.it/test/page456',
    'http://www.test.it/test/endpoint789',
  ];
  const fileList = ['Test-1.json', 'Test-6.json'];
  globby.mockResolvedValue(fileList);
  jest.spyOn(fsPromises, 'readFile').mockImplementation(() => {
    return JSON.stringify(content);
  });
  it('should return an array with complete url', async () => {
    expect(await GetPdpUrls('http://www.test.it', './test/')).toEqual(result);
  });
  it('should return an array empty', async () => {
    globby.mockResolvedValue([]);
    expect(await GetPdpUrls('http://www.test.it', './test/')).toEqual([]);
  });
  it('should throw if href are empty', async () => {
    const content = [{ href: '..' }];
    globby.mockResolvedValue(fileList);
    jest.spyOn(fsPromises, 'readFile').mockImplementation(filename => {
      return JSON.stringify(content);
    });
    expect(await GetPdpUrls('', '')).toEqual([]);
  });
});
