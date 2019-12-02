const FetchToText = require('./__mocks__/FetchToText');

describe('FetchToText', async () => {
  it('should call url and return text', async () => {
    await expect(FetchToText('http://www.aaa.it')).resolves.toBe('text');
  });
});
