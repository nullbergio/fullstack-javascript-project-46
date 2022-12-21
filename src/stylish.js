const getIndent = (depth, flag = null) => {
  const step = '    ';
  const indent = step.repeat(depth);
  return !!flag ? indent.slice(0, indent.length - 2) + flag + ' ' : indent;
}

const stringify = (value, depth = 1) => {
  if (Array.isArray(value)) {

  }
  return value;
// Check is_string and use json encode. Not sure.

}

const formatStylish = (data, depth = 1) => {
  const result = data.map((node) => {
    let line = '';
    let linePrefix = '';
    let oldLinePrefix = '';
    let oldLine = '';
    let newLinePrefix = '';
    let newline = '';

    switch (node.status) {
      case 'nested':
        linePrefix = getIndent(depth);
        line = linePrefix + node.name + ': ' + formatStylish(node.children, depth + 1);
        break;
      case 'added':
        linePrefix = getIndent(depth, '+');
        line = linePrefix + node.name + ': ' + stringify(node.value, depth);
        break;
      case 'deleted':
        linePrefix = getIndent(depth, '-');
        line = linePrefix + node.name + ': ' + stringify(node.value, depth);
        break;
      case 'unchanged':
        linePrefix = getIndent(depth);
        line = linePrefix + node.name + ': ' + stringify(node.value, depth);
        break;
      case 'changed':
        oldLinePrefix = getIndent(depth, '-');
        oldLine = oldLinePrefix + node.name + ': ' + stringify(node.oldValue, depth);
        newLinePrefix = getIndent(depth, '+');
        newline = newLinePrefix + node.name + ': ' + stringify(node.newValue, depth);
        line = oldLine + '\n' + newline;
        break;
      default:
    }
    return line;
  });

  const resultPrefix = '{\n';
  const resultIndent = getIndent(depth);
  const resultPostfix =  '\n' + resultIndent.slice(0, resultIndent.length - 4) + '}';

  return resultPrefix + result.join('\n') + resultPostfix;
}

export default formatStylish;
