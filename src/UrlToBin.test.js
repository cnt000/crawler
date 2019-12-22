const UrlToBin = require('./UrlToBin');
const { FetchToBuffer } = require('./FetchTo');
const { SaveFile } = require('./File');
jest.mock('./FetchTo');
jest.mock('./File');

describe('UrlToBin', () => {
  it('should not throw exception', () => {
    FetchToBuffer.mockReturnValue(Promise.resolve(Buffer.from('text')));
    SaveFile.mockReturnValue(Promise.resolve(''));
    expect(() => UrlToBin(24, 'http://test.it', 'file.json')).not.toThrow();
  });
  it('should throw exception if filename empty', async () => {
    FetchToBuffer.mockReturnValue(Promise.resolve(Buffer.from('text')));
    SaveFile.mockReturnValue(Promise.reject('Filename is empty'));
    await expect(UrlToBin(24, 'http://test.it', '')).rejects.toThrow();
  });
  // it('should have been called with 12', async () => {
  //   FetchToBuffer.mockReturnValue(Promise.resolve(Buffer.from('text')));
  //   SaveFile.mockReturnValue(Promise.resolve(''));
  //   await UrlToBin(12, 'http://test.it', 'file.json');
  //   expect(UrlToBin).toHaveBeenCalledWith(12);
  // });
});
