import path from 'node:path';
import fs from 'node:fs';
import genDiff from '../src/differ.js';

test('testing genDiff (json && stylish)', () => {
  const filePath1 = path.resolve(process.cwd(), './__fixtures__/simple-file1.json');
  const filePath2 = path.resolve(process.cwd(), './__fixtures__/simple-file2.json');
  const expectedResult = fs.readFileSync(path.resolve(process.cwd(), './__fixtures__/simple-file-result.txt'), 'utf8');
  const receivedResult = genDiff(filePath1, filePath2, 'stylish');
  expect(receivedResult).toMatch(expectedResult);
});

test('testing genDiff (yaml && stylish)', () => {
  const filePath1 = path.resolve(process.cwd(), './__fixtures__/simple-file1.yml');
  const filePath2 = path.resolve(process.cwd(), './__fixtures__/simple-file2.yml');
  const expectedResult = fs.readFileSync(path.resolve(process.cwd(), './__fixtures__/simple-file-result.txt'), 'utf8');
  const receivedResult = genDiff(filePath1, filePath2, 'stylish');
  expect(receivedResult).toMatch(expectedResult);
});
