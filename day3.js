const { input } = require('./input/day3');
const inputList = input.split('\n');
const start = [0, 0];
let result = 0;
const move = (x, y) => [x + 3, y + 1];
console.log(inputList[start[0]][start[1]], start);
let movedCoord = move(...start);
console.log(inputList[movedCoord[0]][movedCoord[1]]);
for (let i = 0; i < inputList[0].length; i++) {
  movedCoord = move(...movedCoord);
  if (inputList[movedCoord[0]][movedCoord[1]] === '#') {
    result++;
  }
  console.log(inputList[movedCoord[0]][movedCoord[1]]);
}
console.log(result);
