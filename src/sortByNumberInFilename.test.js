const sortByNumberInFilename = require('./sortByNumberInFilename');

describe('sortByNumberInFilename', () => {
  it('should order correctly 0,1,2,3', () => {
    const filesToSort = [
      'test-1.json',
      'test-3.json',
    ];
    expect(sortByNumberInFilename(filesToSort)).toMatchObject(filesToSort);
  });
  it('should order correctly 0,1,10,2,20,21', () => {
    const filesToSort = [
      'test-21.json',
      'test-0.json',
      'test-2.json',
      'test-1.json',
      'test-10.json',
      'test-20.json',
    ];
    expect(sortByNumberInFilename(filesToSort)).toMatchObject([
      'test-0.json',
      'test-1.json',
      'test-2.json',
      'test-10.json',
      'test-20.json',
      'test-21.json',
    ]);
  });
  it('should not sort without number in filename', () => {
    const filesToSort = [
      'test.json',
      'test.json',
      'test-test.json',
      'test-file.json',
      'test-.json',
    ];
    expect(() => sortByNumberInFilename(filesToSort)).toThrow();
  });
  it('should sort with some files with number, some files without', () => {
    const filesToSort = [
      'test-1.json',
      'test-2.json',
      'test-test.json',
      'test-file.json',
      'test-100.json',
    ];
    expect(() => sortByNumberInFilename(filesToSort)).toThrow();
  });
});
