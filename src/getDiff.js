import _ from 'lodash';

const getDiff = (data1, data2) => {
  const uniqNodeNames = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  return uniqNodeNames.map((nodeName) => {
    if (!Object.hasOwn(data1, nodeName)) {
      return {
        name: nodeName,
        value: data2[nodeName],
        status: 'added',
      };
    }

    if (!Object.hasOwn(data2, nodeName)) {
      return {
        name: nodeName,
        value: data1[nodeName],
        status: 'deleted',
      };
    }

    if (data1[nodeName] === data2[nodeName]) {
      return {
        name: nodeName,
        value: data2[nodeName],
        status: 'unchanged',
      };
    }

    if (_.isObject(data1[nodeName]) && _.isObject(data2[nodeName])) {
      const nodeChildren = getDiff(data1[nodeName], data2[nodeName]);
      return {
        name: nodeName,
        children: nodeChildren,
        status: 'nested',
      };
    }

    return {
      name: nodeName,
      oldValue: data1[nodeName],
      newValue: data2[nodeName],
      status: 'changed',
    };
  });
};

export default getDiff;
