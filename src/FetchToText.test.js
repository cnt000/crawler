const fetch = require('node-fetch');
const { FetchToText, FetchToBuffer } = require('./FetchTo');
jest.mock('node-fetch');
const { Response } = jest.requireActual('node-fetch');

describe('FetchToText', () => {
  it('should call url and return text', async () => {
    fetch.mockReturnValue(Promise.resolve(new Response('text')));
    expect(await FetchToText('http://www.aaa.it')).toEqual('text');
  });
  it('should call empty url and throw', async () => {
    fetch.mockReturnValue(Promise.resolve(new Error('text')));
    try {
      await expect(FetchToText('')).resolves.toThrow();
    } catch (e) {
      console.log(e);
    }
  });
});

describe('FetchToBuffer', () => {
  it('should call url and return buffer', async () => {
    fetch.mockReturnValue(
      Promise.resolve(new Response(Buffer.from('test string'))),
    );
    expect(await FetchToBuffer('http://www.aaa.it/img.jpg')).toEqual(
      new ArrayBuffer(11),
    );
  });
  it('should call empty url and throw', async () => {
    fetch.mockReturnValue(Promise.resolve(new Error('text')));
    try {
      await expect(FetchToBuffer('')).resolves.toThrow();
    } catch (e) {
      console.log(e);
    }
  });
});
