import path from 'node:path';
import fs from 'node:fs';
import genDiff from '../src/differ.js';

const getFixturePath = (fileName) => path.join(process.cwd(), '__fixtures__', fileName);

test('simple test genDiff (json && stylish)', () => {
  const filePath1 = getFixturePath('simple-file1.json');
  const filePath2 = getFixturePath('simple-file2.json');
  const expectedResult = fs.readFileSync(getFixturePath('simple-stylish-result.txt'), 'utf8');
  const receivedResult = genDiff(filePath1, filePath2, 'stylish');
  expect(receivedResult).toMatch(expectedResult);
});

test('simple test genDiff (yaml && stylish)', () => {
  const filePath1 = getFixturePath('simple-file1.yml');
  const filePath2 = getFixturePath('simple-file2.yml');
  const expectedResult = fs.readFileSync(getFixturePath('simple-stylish-result.txt'), 'utf8');
  const receivedResult = genDiff(filePath1, filePath2, 'stylish');
  expect(receivedResult).toMatch(expectedResult);
});

test('complex test genDiff (json && stylish)', () => {
  const filePath1 = getFixturePath('complex-file1.json');
  const filePath2 = getFixturePath('complex-file2.json');
  const expectedResult = fs.readFileSync(getFixturePath('complex-stylish-result.txt'), 'utf8');
  const receivedResult = genDiff(filePath1, filePath2, 'stylish');
  expect(receivedResult).toMatch(expectedResult);
});

test('complex test genDiff (yaml && stylish)', () => {
  const filePath1 = getFixturePath('complex-file1.yml');
  const filePath2 = getFixturePath('complex-file2.yml');
  const expectedResult = fs.readFileSync(getFixturePath('complex-stylish-result.txt'), 'utf8');
  const receivedResult = genDiff(filePath1, filePath2, 'stylish');
  expect(receivedResult).toMatch(expectedResult);
});

test('complex test genDiff (json && plain)', () => {
  const filePath1 = getFixturePath('complex-file1.json');
  const filePath2 = getFixturePath('complex-file2.json');
  const expectedResult = fs.readFileSync(getFixturePath('complex-plain-result.txt'), 'utf8');
  const receivedResult = genDiff(filePath1, filePath2, 'plain');
  expect(receivedResult).toMatch(expectedResult);
});

test('complex test genDiff (yaml && plain)', () => {
  const filePath1 = getFixturePath('complex-file1.yml');
  const filePath2 = getFixturePath('complex-file2.yml');
  const expectedResult = fs.readFileSync(getFixturePath('complex-plain-result.txt'), 'utf8');
  const receivedResult = genDiff(filePath1, filePath2, 'plain');
  expect(receivedResult).toMatch(expectedResult);
});
