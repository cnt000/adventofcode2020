const { input } = require('./input/day8');
const splittedLines = input.split('\n');

let position = 0;
let counter = 0;
let path = [];

while(true) {
  getNextPos(splittedLines[position]);
  if(path.includes((position))) break;
  path.push(position);
}
console.log('Result: ', counter);

function getNextPos(cmd) {
  const regex = new RegExp(`(nop|acc|jmp) ([+|-]{1}[0-9]+)`);
  const [, op, opValue] = cmd.match(regex);
  const opNumber = Number(opValue);
  const positionIncr = op === 'jmp' ? opNumber : 1;
  const counterIncr = op === 'acc' ? opNumber : 0;
  position += positionIncr;
  counter += counterIncr;
}
