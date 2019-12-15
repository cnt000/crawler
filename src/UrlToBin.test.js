const UrlToBin = require('./UrlToBin');
const { FetchToBuffer } = require('./FetchTo');
const { SaveFile } = require('./File');
jest.mock('./FetchTo');
jest.mock('./File');

describe('UrlToBin', () => {
  it('should not throw exception', () => {
    FetchToBuffer.mockReturnValue(Promise.resolve(Buffer.from('text')));
    SaveFile.mockReturnValue(Promise.resolve(''));
    expect(() => UrlToBin('http://test.it', 'file.json')).not.toThrow();
  });
  it('should throw exception if filename empty', async () => {
    FetchToBuffer.mockReturnValue(Promise.resolve(Buffer.from('text')));
    SaveFile.mockReturnValue(Promise.reject('Filename is empty'));
    await expect(UrlToBin('http://test.it', '')).rejects.toThrow();
  });
});
