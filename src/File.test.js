const fsPromises = require('fs').promises;
const mkdirp = require('mkdirp-promise');
const getDirName = require('path').dirname;
const del = require('del');
const { ReadFile } = require('./File');

describe('ReadFile', () => {
  const dir = './testFiles/';
  const filename = 'testFile.json';
  const dirFilename = `${dir}${filename}`;
  const content = ['a', 'b', 'c'];
  beforeAll(async () => {
    await mkdirp(getDirName(dirFilename));
    await fsPromises.writeFile(dirFilename, JSON.stringify(content), {
      flag: 'w',
    });
  });
  it('should read a JSON file', async () => {
    expect(await ReadFile(dirFilename)).toEqual(content);
  });
  it('should throw if file does not exist', async () => {
    await expect(ReadFile('test.json')).rejects.toThrow();
  });
  it('should throw if file is not valid JSON', async () => {
    const notValidFile = './testFiles/notValidFile.json';
    await fsPromises.writeFile(notValidFile, "['x, y','z']", {
      flag: 'w',
    });
    await expect(ReadFile(notValidFile)).rejects.toThrow();
  });
  afterAll(async () => {
    const deletedPaths = await del([`${dirFilename}/*`]);
    console.log(`Test file deleted: ${deletedPaths}`);
  });
});

// describe('WriteFile', () => {
//     const dir = './testFiles/';
//     const filename = 'testFileWritten.txt';
//     const dirFilename = `${dir}${filename}`;
//   it('should write a text file', async () => {
//     await expect(SaveFile(dirFilename, 'loren impsum')).resolves.not.toThrow();
//   });
// });
