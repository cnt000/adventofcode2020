const { input } = require('./input/day8');
const splittedLines = input.split('\n');

const exampleLoop = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`.split('\n');

console.log('Example:');
find(exampleLoop);
console.log('Input:');
find(splittedLines);

function find(input) {
  let position = 0;
  let acc = 0;
  const originalInput = [...input];
  while (true) {
    const [inputFixed, substitutionPosition] = subsFirst(originalInput, position);
    position = substitutionPosition + 1;
    const [correctOrLoop, newAcc] = isCorrect([...inputFixed], acc);
    if (correctOrLoop) {
      console.log('Counter', newAcc);
      return newAcc;
    }
  }
}

function subsFirst(input, start) {
  let foundIndex = 0;
  let modifiedInput = [...input];
  for (let i = start; i < input.length; i++) {
    const matches = input[i].match(/(jmp|nop) ([+|-]{1}[0-9]+)/);
    if (matches) {
      const [, instruction, value] = matches;
      if (instruction === 'nop') {
        modifiedInput[i] = `jmp ${value}`;
        foundIndex = i;
        break;
      }
      if (instruction === 'jmp') {
        modifiedInput[i] = `nop ${value}`;
        foundIndex = i;
        break;
      }
    }
  }
  return [modifiedInput, foundIndex]
}

function isCorrect(input, acc) {
  let position = 0;
  let path = [];
  while (true) {
    let [positionIncr, counterIncr] = getNextPos(input[position]);
    position += positionIncr;
    acc += counterIncr;
    if (position === input.length) {
      return [true, acc];
    }
    if (path.includes(position)) return [false, acc];
    path.push(position);
  }
}

function getNextPos(cmd) {
  const regex = new RegExp(`(nop|acc|jmp) ([+|-]{1}[0-9]+)`);
  const [, op, opValue] = cmd.match(regex);
  const opNumber = Number(opValue);
  const positionIncr = op === 'jmp' ? opNumber : 1;
  const counterIncr = op === 'acc' ? opNumber : 0;
  return [positionIncr, counterIncr];
}
