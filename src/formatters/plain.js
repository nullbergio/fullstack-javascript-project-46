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
    let [line, nestedPath] = '';

    switch (node.status) {
      case 'nested':
        nestedPath = `${path}${node.name}.`;
        line = formatPlain(node.children, nestedPath);
        break;
      case 'added':
        line = `Property '${property}' was added with value: ${stringify(node.value)}`;
        break;
      case 'deleted':
        line = `Property '${property}' was removed`;
        break;
      case 'changed':
        line = `Property '${property}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`;
        break;
      default:
    }
    return line;
  });
  return result.filter((v) => (v)).join('\n');
};

export default formatPlain;
