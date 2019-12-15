// const UrlToBin = require('./UrlToBin');
// const { FetchToBuffer } = require('./FetchTo');
// const { SaveFile } = require('./File');
jest.mock('./FetchTo');
jest.mock('./File');

describe('UrlToBin', () => {
  // it('should not throw exception', () => {
  //   const crawlFunc = jest.fn(x => ({ id: 1, name: 2 }));
  //   FetchToBuffer.mockReturnValue(Promise.resolve('text'));
  //   SaveFile.mockReturnValue(Promise.resolve(''));
  //   expect(() => UrlToBin('http://test.it', 'file.json', crawlFunc)).not.toThrow();
  // });
  // it('should throw exception if filename empty', () => {
  //   const crawlFunc = jest.fn(x => ({ id: 1, name: 2 }));
  //   FetchToBuffer.mockReturnValue(Promise.resolve('text'));
  //   // FIXME node warning
  //   SaveFile.mockReturnValue(Promise.reject('Error'));
  //   expect(() =>
  //     UrlToBin('http://test.it', '', crawlFunc),
  //   ).not.toThrow();
  // });
});
