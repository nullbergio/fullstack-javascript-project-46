import path from 'node:path';
import process from 'node:process';
import fs from 'node:fs';

const getAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath);

const getExtension = (filePath) => path.extname(filePath).slice(1);

const readFile = (filePath) => {
  try {
    fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.error(err);
  }
  return fs.readFileSync(filePath, 'utf8');
};

export { getAbsolutePath, getExtension, readFile };
