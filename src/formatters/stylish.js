import _ from 'lodash';

const getIndent = (depth, flag = null) => {
  const step = '    ';
  const indent = step.repeat(depth);
  return flag !== null ? `${indent.slice(0, indent.length - 2)}${flag} ` : indent;
};

const stringify = (value, depth = 1) => {
  if (_.isObject(value)) {
    const arrayValue = Object.entries(value).map(([nodeName, nodeValue]) => (`${getIndent(depth + 1)}${nodeName}: ${stringify(nodeValue, depth + 1)}`));
    const resultPrefix = '{\n';
    const resultPostfix = `\n${getIndent(depth)}}`;
    return resultPrefix + arrayValue.join('\n') + resultPostfix;
  }
  return value;
};

const formatStylish = (data, depth = 1) => {
  const result = data.map((node) => {
    switch (node.status) {
      case 'nested': {
        const lineNestedPrefix = getIndent(depth);
        return `${lineNestedPrefix}${node.name}: ${formatStylish(node.children, depth + 1)}`;
      }
      case 'added': {
        const lineAddedPrefix = getIndent(depth, '+');
        return `${lineAddedPrefix}${node.name}: ${stringify(node.value, depth)}`;
      }
      case 'deleted': {
        const lineDeletedPrefix = getIndent(depth, '-');
        return `${lineDeletedPrefix}${node.name}: ${stringify(node.value, depth)}`;
      }
      case 'unchanged': {
        const lineUnchangedPrefix = getIndent(depth);
        return `${lineUnchangedPrefix}${node.name}: ${stringify(node.value, depth)}`;
      }
      case 'changed': {
        const oldChangedLinePrefix = getIndent(depth, '-');
        const oldLine = `${oldChangedLinePrefix}${node.name}: ${stringify(node.oldValue, depth)}`;
        const newChangedLinePrefix = getIndent(depth, '+');
        const newline = `${newChangedLinePrefix}${node.name}: ${stringify(node.newValue, depth)}`;
        return `${oldLine}\n${newline}`;
      }
      default:
        return null;
    }
  });

  const resultPrefix = '{\n';
  const resultIndent = getIndent(depth);
  const resultPostfix = `\n${resultIndent.slice(0, resultIndent.length - 4)}}`;

  return resultPrefix + result.join('\n') + resultPostfix;
};

export default formatStylish;
