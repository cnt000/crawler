const fsPromises = require('fs').promises;
const { ReadFile, SaveFile } = require('./File');

describe('ReadFile', () => {
  const filename = 'testFile.json';
  const content = ['a', 'b', 'c'];
  it('should read a JSON file', async () => {
    jest
      .spyOn(fsPromises, 'readFile')
      .mockImplementation((filename, options) => {
        return JSON.stringify(content);
      });
    expect(await ReadFile(filename)).toEqual(content);
  });
  it('should throw if file does not exist', async () => {
    jest
      .spyOn(fsPromises, 'readFile')
      .mockImplementation((filename, options) => {
        throw Error('file does not exist');
      });
    await expect(ReadFile('test.json')).rejects.toThrow();
  });
  it('should throw if file is not valid JSON', async () => {
    jest
      .spyOn(fsPromises, 'readFile')
      .mockImplementation((filename, options) => {
        try {
          JSON.parse("['a, 'b, 'c']");
        } catch (e) {
          throw Error('JSON not valid');
        }
      });
    const notValidFile = './testFiles/notValidFile.json';
    await expect(ReadFile(notValidFile)).rejects.toThrow();
  });
});

describe('WriteFile', () => {
  const filename = 'testFile.json';
  it('should write a text file', async () => {
    jest
      .spyOn(fsPromises, 'writeFile')
      .mockImplementation((filename, content, options) => {
        return content;
      });
    await expect(SaveFile(filename, 'loren impsum')).resolves.not.toThrow();
  });
  it('should throw with emtpy filename', async () => {
    jest
      .spyOn(fsPromises, 'writeFile')
      .mockImplementation((filename, content, options) => {
        if (filename === '') throw Error('filename is empty');
      });
    await expect(SaveFile('', 'loren impsum')).rejects.toThrow();
  });
});
