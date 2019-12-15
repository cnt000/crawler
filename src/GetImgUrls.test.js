const fsPromises = require('fs').promises;
const globby = require('globby');
const GetImgsUrls = require('./GetImgsUrls');
jest.mock('globby');

describe('GetImgsUrls', () => {
  const content = { image: 'test/index.jpg' };
  const result = [
    'http://www.test.it/test/index.jpg',
    'http://www.test.it/test/index.jpg',
  ];
  const fileList = ['Test-1.json', 'Test-6.json'];
  globby.mockResolvedValue(fileList);
  jest.spyOn(fsPromises, 'readFile').mockImplementation(() => {
    return JSON.stringify(content);
  });
  it('should return an array with complete url', async () => {
    expect(await GetImgsUrls('http://www.test.it/', './test/*')).toEqual(
      result,
    );
  });
  it('should return an array empty', async () => {
    globby.mockResolvedValue([]);
    expect(await GetImgsUrls('http://www.test.it', './test/')).toEqual([]);
  });
  it('should throw if href are empty', async () => {
    const content = { image: '' };
    globby.mockResolvedValue(fileList);
    jest.spyOn(fsPromises, 'readFile').mockImplementation(() => {
      return JSON.stringify(content);
    });
    expect(await GetImgsUrls('', '')).toEqual(['', '']);
  });
});
