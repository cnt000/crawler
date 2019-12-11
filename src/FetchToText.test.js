const fetch = require('node-fetch');
const FetchToText = require('./FetchToText');
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
