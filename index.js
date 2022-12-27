import parseData from './src/parseData.js';
import formatData from './src/formatters/index.js';
import getDiff from './src/getDiff.js';
import { getAbsolutePath, getExtension, readFile } from './src/readFile.js';

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const absoluteFilePath1 = getAbsolutePath(filePath1);
  const absoluteFilePath2 = getAbsolutePath(filePath2);
  const fileExtension1 = getExtension(absoluteFilePath1);
  const fileExtension2 = getExtension(absoluteFilePath2);
  const fileRawData1 = readFile(absoluteFilePath1);
  const fileRawData2 = readFile(absoluteFilePath2);
  const fileData1 = parseData(fileRawData1, fileExtension1);
  const fileData2 = parseData(fileRawData2, fileExtension2);
  const diffData = getDiff(fileData1, fileData2);
  return formatData(diffData, format);
};

export default genDiff;
