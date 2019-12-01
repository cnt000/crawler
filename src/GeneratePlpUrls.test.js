const GeneratePlpUrls = require('./GeneratePlpUrls');

describe('GeneratePlpUrls', () => {
  it('should return an array length 5', () => {
    expect(GeneratePlpUrls('http://www.test.it/page?id=', 4).length).toBe(4);
  });
  it('should return an array length 0', () => {
    expect(GeneratePlpUrls('http://www.test.es/page?id=', 0).length).toBe(0);
  });
  it('should contain par1 and par2', () => {
    const par1 = 'http://www.test.de/page?id=';
    const par2 = 1;
    expect(GeneratePlpUrls(par1, par2)[0]).toMatch(`${par1}${par2 - 1}`);
  });
});
