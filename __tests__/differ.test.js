import path from 'node:path';
import fs from 'node:fs';
import genDiff from '../index.js';

const getFixturePath = (fileName) => path.join(process.cwd(), '__fixtures__', fileName);
const fileComplexJson1 = getFixturePath('complex-file1.json');
const fileComplexJson2 = getFixturePath('complex-file2.json');
const fileComplexYml1 = getFixturePath('complex-file1.yml');
const fileComplexYml2 = getFixturePath('complex-file2.yml');
const fileStylishResult = fs.readFileSync(getFixturePath('complex-stylish-result.txt'), 'utf8');
const filePlainResult = fs.readFileSync(getFixturePath('complex-plain-result.txt'), 'utf8');
const fileJsonResult = fs.readFileSync(getFixturePath('complex-json-result.txt'), 'utf8');

const cases = [
  ['json->json', undefined, fileComplexJson1, fileComplexJson2, fileStylishResult],
  ['json->json', 'stylish', fileComplexJson1, fileComplexJson2, fileStylishResult],
  ['yaml->yaml', 'stylish', fileComplexYml1, fileComplexYml2, fileStylishResult],
  ['json->yaml', 'stylish', fileComplexJson1, fileComplexYml2, fileStylishResult],
  ['yaml->json', 'stylish', fileComplexYml1, fileComplexJson2, fileStylishResult],
  ['json->json', 'plain', fileComplexJson1, fileComplexJson2, filePlainResult],
  ['yaml->yaml', 'plain', fileComplexYml1, fileComplexYml2, filePlainResult],
  ['json->yaml', 'plain', fileComplexJson1, fileComplexYml2, filePlainResult],
  ['yaml->json', 'plain', fileComplexYml1, fileComplexJson2, filePlainResult],
  ['json->json', 'json', fileComplexJson1, fileComplexJson2, fileJsonResult],
  ['yaml->yaml', 'json', fileComplexYml1, fileComplexYml2, fileJsonResult],
  ['json->yaml', 'json', fileComplexJson1, fileComplexYml2, fileJsonResult],
  ['yaml->json', 'json', fileComplexYml1, fileComplexJson2, fileJsonResult],
];

describe('test differ', () => {
  test.each(cases)(
    '%p comparison with %p formatting',
    (desc, format, file1, file2, expected) => {
      const received = genDiff(file1, file2, format);
      expect(received).toEqual(expected);
    },
  );
});
