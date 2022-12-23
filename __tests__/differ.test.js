import path from 'node:path';
import fs from 'node:fs';
import genDiff from '../src/differ.js';

const getFixturePath = (fileName) => path.join(process.cwd(), '__fixtures__', fileName);
const fileComplexJson1 = getFixturePath('complex-file1.json');
const fileComplexJson2 = getFixturePath('complex-file2.json');
const fileComplexYml1 = getFixturePath('complex-file1.yml');
const fileComplexYml2 = getFixturePath('complex-file2.yml');
const fileStylishResult = fs.readFileSync(getFixturePath('complex-stylish-result.txt'), 'utf8');
const filePlainResult = fs.readFileSync(getFixturePath('complex-plain-result.txt'), 'utf8');
const fileJsonResult = fs.readFileSync(getFixturePath('complex-json-result.txt'), 'utf8');

test('complex test genDiff (json && stylish)', () => {
  const receivedResult = genDiff(fileComplexJson1, fileComplexJson2, 'stylish');
  expect(receivedResult).toMatch(fileStylishResult);
});

test('complex test genDiff (yaml && stylish)', () => {
  const receivedResult = genDiff(fileComplexYml1, fileComplexYml2, 'stylish');
  expect(receivedResult).toMatch(fileStylishResult);
});

test('complex test genDiff (json && plain)', () => {
  const receivedResult = genDiff(fileComplexJson1, fileComplexJson2, 'plain');
  expect(receivedResult).toMatch(filePlainResult);
});

test('complex test genDiff (yaml && plain)', () => {
  const receivedResult = genDiff(fileComplexYml1, fileComplexYml2, 'plain');
  expect(receivedResult).toMatch(filePlainResult);
});

test('complex test genDiff (json && json)', () => {
  const receivedResult = genDiff(fileComplexJson1, fileComplexJson2, 'json');
  expect(receivedResult).toMatch(fileJsonResult);
});

test('complex test genDiff (yaml && json)', () => {
  const receivedResult = genDiff(fileComplexYml1, fileComplexYml2, 'json');
  expect(receivedResult).toMatch(fileJsonResult);
});
