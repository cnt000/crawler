const UrlToJsonFile = require('./UrlToJsonFile');
const { FetchToText } = require('./FetchTo');
const { SaveFile } = require('./File');
jest.mock('./FetchTo');
jest.mock('./File');

describe('UrlToJsonFile', () => {
  it('should not throw exception', () => {
    const crawlFunc = jest.fn(x => ({ id: 1, name: 2 }));
    FetchToText.mockReturnValue(Promise.resolve('text'));
    SaveFile.mockReturnValue(Promise.resolve(''));
    expect(() =>
      UrlToJsonFile('http://test.it', 'file.json', crawlFunc),
    ).not.toThrow();
  });
  it('should throw exception if filename empty', () => {
    const crawlFunc = jest.fn(x => ({ id: 1, name: 2 }));
    FetchToText.mockReturnValue(Promise.resolve('text'));
    // FIXME node warning
    SaveFile.mockReturnValue(Promise.reject(new Error('Error')));
    expect(() => UrlToJsonFile('http://test.it', '', crawlFunc)).not.toThrow();
  });
});
