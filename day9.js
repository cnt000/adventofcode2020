const { input } = require('./input/day9');
const splittedLines = input.split('\n').map(n => +n);

const preambleLength = 25;
const examplePreambleLength = 5;

const example = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`.split('\n').map(n => +n);

function searchWrongNumber(input, preamble) {
  for (let i = preamble; i < input.length; i++) {
    const number = input[i];
    const found = checkNumber(number, input.slice(i - preamble, i))
    if (found === 0) {
      return number;
    }
  }
}

function checkNumber(number, input) {
  let found = 0;
  for (let i = 0; i < input.length; i++) {
    const first = input[i];
    for (let j = 1; j < input.length; j++) {
      const second = input[j];
      if (first + second === number) {
        found++;
      }
    }
  }
  return found;
}

console.log(
  'Result:',
  searchWrongNumber(example, examplePreambleLength)
);
console.log(
  'Result:',
  searchWrongNumber(splittedLines, preambleLength)
);
