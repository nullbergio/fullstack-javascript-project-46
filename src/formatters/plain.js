import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const formatPlain = (data, path = '') => {
  const result = data.map((node) => {
    const property = path + node.name;

    switch (node.status) {
      case 'nested': {
        const nestedPath = `${path}${node.name}.`;
        return formatPlain(node.children, nestedPath);
      }
      case 'added':
        return `Property '${property}' was added with value: ${stringify(node.value)}`;
      case 'deleted':
        return `Property '${property}' was removed`;
      case 'changed':
        return `Property '${property}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`;
      default:
        return null;
    }
  });
  return result.filter((v) => (v)).join('\n');
};

export default formatPlain;
