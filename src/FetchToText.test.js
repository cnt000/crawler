const fetch = require('node-fetch');
const FetchToText = require('./FetchToText');
jest.mock('node-fetch');

describe('FetchToText', () => {
  it('should call url and return text', async () => {
    fetch.mockResolvedValue('text');
    expect(await FetchToText('http://www.aaa.it')).toEqual('text');
  });
});
