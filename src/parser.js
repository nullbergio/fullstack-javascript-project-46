import path from 'node:path';
import process from 'node:process';
import * as fs from 'node:fs';
import yaml from 'js-yaml';

const parseData = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.load(data);
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
  const fileExtension = path.extname(absoluteFilePath);

  switch (fileExtension) {
    case '.json':
      return parseData(fileData, 'json');
    case '.yml':
    case '.yaml':
      return parseData(fileData, 'yml');
    default:
      console.error('Unknown extension:', fileExtension);
      return null;
  }
};

export default parseFile;
