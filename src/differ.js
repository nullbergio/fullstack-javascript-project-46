import _ from 'lodash';
import parseFile from "./parser.js";
import formatData from "./formatter.js"


const genDiff = (filepath1, filepath2, format) => {
  const data = getDiff(parseFile(filepath1), parseFile(filepath2));
  return formatData(data, format);
}

const getDiff = (data1, data2) => {
  const result = [];
  let node = {};
  const uniqNodeNames = _.union(Object.keys(data1), Object.keys(data2)).sort();

  for (const nodeName of uniqNodeNames) {
    if (!Object.hasOwn(data1, nodeName)) {
      node = {
        name: nodeName,
        value: data2[nodeName],
        status: 'added',
      }
    } else if (!Object.hasOwn(data2, nodeName)) {
      node = {
        name: nodeName,
        value: data1[nodeName],
        status: 'deleted',
      }
    } else if (data1[nodeName] === data2[nodeName]) {
      node = {
        name: nodeName,
        value: data2[nodeName],
        status: 'unchanged',
      }
    } else if (Array.isArray(data1[nodeName]) && Array.isArray(data2[nodeName])) {
      const nodeChildren = getDiff(data1[nodeName], data2[nodeName]);
      node = {
        name: nodeName,
        children: nodeChildren,
        status: 'nested',
      }
    } else {
      node = {
        name: nodeName,
        oldValue: data1[nodeName],
        newValue: data2[nodeName],
        status: 'changed',
      }
    }
    result.push(node);
  }

  return result;
}

export default genDiff;
