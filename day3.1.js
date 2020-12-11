const { input } = require('./input/day3');

const inputList = input.split('\n');

const traverse = (r, d) => {
  let x = y = result = 0;
  for (y = d; y <= inputList.length - 1; y=y+d) {
    x = (x + r) % inputList[0].length;
    if (inputList[y][x] === '#') {
      result++;
    }
  }
  return result;
}

console.log(traverse(1, 1) * traverse(3, 1) * traverse(5, 1) * traverse(7, 1) * traverse(1, 2));
