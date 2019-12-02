const Config = require('./Config');
const ValidationRegex = require('./ValidationRegex');

describe('Config', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = {
      dataDir: './data',
      baseUrl: 'http://www.test.it',
      plpUrl: '/pages/id=1',
      plpPages: 42,
      pdpUrl: '/page/productId=12',
    };
  });
  it('should read config from env', () => {
    expect(Config(ValidationRegex)).toEqual(
      expect.objectContaining({
        dataDir: expect.any(String),
        baseUrl: expect.any(String),
        plpUrl: expect.any(String),
        plpPages: expect.any(Number),
        pdpUrl: expect.any(String),
      }),
    );
  });
  it('should work if baseUrl does contain https://', () => {
    const Env = {
      ...process.env,
      baseUrl: 'https://test.it',
    };
    process.env = Env;
    expect(Config(ValidationRegex)).toEqual(
      expect.objectContaining({
        dataDir: expect.any(String),
        baseUrl: expect.any(String),
        plpUrl: expect.any(String),
        plpPages: expect.any(Number),
        pdpUrl: expect.any(String),
      }),
    );
  });
  it('should throw if baseUrl does not contain http://', () => {
    const Env = {
      ...process.env,
      baseUrl: 'test.it',
    };
    process.env = Env;
    expect(() => Config(ValidationRegex)).toThrow();
  });
  it('should throw if baseUrl does contain spaces', () => {
    const Env = {
      ...process.env,
      baseUrl: 'http://te s t.it',
    };
    process.env = Env;
    expect(() => Config(ValidationRegex)).toThrow();
  });
  it('should throw if baseUrl contain spaces or not contain http:', () => {
    const Env = {
      ...process.env,
      baseUrl: 'te s t.it',
    };
    process.env = Env;
    expect(() => Config(ValidationRegex)).toThrow();
  });
  it('should throw if plpUrl does not start with /', () => {
    const Env = {
      ...process.env,
      plpUrl: 'test/test?id',
    };
    process.env = Env;
    expect(() => Config(ValidationRegex)).toThrow();
  });
  it('should throw if plpUrl contain spaces', () => {
    const Env = {
      ...process.env,
      plpUrl: '/test/te st?id',
    };
    process.env = Env;
    expect(() => Config(ValidationRegex)).toThrow();
  });
  it('should throw if pdpUrl does not start with /', () => {
    const Env = {
      ...process.env,
      pdpUrl: 'test/test?id',
    };
    process.env = Env;
    expect(() => Config(ValidationRegex)).toThrow();
  });
  it('should throw if pdpUrl contain spaces', () => {
    const Env = {
      ...process.env,
      pdpUrl: '/test/te st?id',
    };
    process.env = Env;
    expect(() => Config(ValidationRegex)).toThrow();
  });
  it('should throw if plpPages is not a number', () => {
    const Env = {
      ...process.env,
      plpPages: 'test',
    };
    process.env = Env;
    expect(() => Config(ValidationRegex)).toThrow();
  });
});
