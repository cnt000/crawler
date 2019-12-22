const UrlToJson = require('./UrlToJson');
const { FetchToText } = require('./FetchTo');
const { SaveFile } = require('./File');
jest.mock('./FetchTo');
jest.mock('./File');

describe('UrlToJson', () => {
  it('should not throw exception', () => {
    const crawlFunc = jest.fn(x => ({ id: 1, name: 2 }));
    FetchToText.mockReturnValue(Promise.resolve('text'));
    SaveFile.mockReturnValue(Promise.resolve(''));
    expect(() =>
      UrlToJson(12, 'http://test.it', 'file.json', crawlFunc),
    ).not.toThrow();
  });
  it('should throw exception if filename empty', async () => {
    const crawlFunc = jest.fn(x => ({ id: 1, name: 2 }));
    SaveFile.mockReturnValue(Promise.reject('Filename is empty'));
    await expect(
      UrlToJson(12, 'http://test.it', '', crawlFunc),
    ).rejects.toThrow();
  });
  // it('should have been called with 12', async () => {
  //   const crawlFunc = jest.fn(x => ({ id: 1, name: 2 }));
  //   FetchToText.mockReturnValue(Promise.resolve('text'));
  //   SaveFile.mockReturnValue(Promise.resolve(''));
  //   await UrlToJson(12, 'http://test.it', 'file.json', crawlFunc);
  //   expect(UrlToJson).toHaveBeenCalledWith(12);
  // });
});
