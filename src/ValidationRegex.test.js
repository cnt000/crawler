const ValidationRegex = require('./ValidationRegex');

describe('ValidationRegex', () => {
  it('should return an object containing regex', () => {
    expect(ValidationRegex).toEqual(
      expect.objectContaining({
        url: expect.any(RegExp),
        number: expect.any(RegExp),
        path: expect.any(RegExp),
        directory: expect.any(RegExp),
      }),
    );
  });
});
