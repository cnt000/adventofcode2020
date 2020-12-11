const { input } = require('./input/day3');

const inputList = input.split('\n');
let result = 0;
let x = 0;

for (let y = 1; y <= inputList.length - 1; y++) {
  x = (x + 3) % inputList[0].length;
  if (inputList[y][x] === '#') {
    result++;
  }
}
console.log(result);
