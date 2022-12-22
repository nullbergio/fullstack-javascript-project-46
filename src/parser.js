import path from 'node:path';
import process from 'node:process';
import * as fs from 'node:fs';

const parseData = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      console.log('format yml');
      return 'yml';
    default:
      console.error('Unknown file format:', format);
      return null;
  }
};

const parseFile = (filePath) => {
  const absoluteFilePath = path.resolve(process.cwd(), filePath);

  try {
    fs.readFileSync(absoluteFilePath, 'utf8');
  } catch (err) {
    console.error(err);
  }

  const fileData = fs.readFileSync(absoluteFilePath, 'utf8');
  const fileExtension = absoluteFilePath.split('/').at(-1).split('.').at(-1)
    .toLowerCase() ?? null;

  switch (fileExtension) {
    case 'json':
      return parseData(fileData, 'json');
    case 'yml':
    case 'yaml':
      return parseData(fileData, 'yml');
    default:
      console.error('Unknown extension:', fileExtension);
      return null;
  }
};

export default parseFile;
