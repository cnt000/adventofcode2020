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

const exampleNoLoop = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
nop -4
acc +6`.split('\n');

let path = [];
console.log('Result:', exec(exampleLoop));
path = [];
console.log('Result:', exec(exampleNoLoop));

function exec(input) {
  let position = 0;
  while (true) {
    let incr = getNextPos(input[position]);
    console.log(
      input[position],
      position % input.length,
    );
    position += incr;
    if (path.includes(position)) return 'Loop!'
    path.push(position);
    if (position === input.length) break;
  }
  return 'Finish!';
}

function getNextPos(cmd) {
  const regex = new RegExp(`(nop|acc|jmp) ([+|-]{1}[0-9]+)`);
  const [, op, opValue] = cmd.match(regex);
  const opNumber = Number(opValue);
  const positionIncr = op === 'jmp' ? opNumber : 1;
  return positionIncr;
}
