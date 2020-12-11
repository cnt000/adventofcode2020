const { input } = require('./input/day3');

// const inputList = input.split('\n');
// const xLength = inputList[0].length;
// const yLength = inputList.length;
// const start = [0, 0];
let result = 0;
// const move = (x, y) => [x + 3, y + 1];
// let movedCoord = start;



// console.log(inputList[start[0]][start[1]], start);
// console.log(inputList[movedCoord[0]][movedCoord[1]]);

// for (let i = 0; i < inputList.length; i++) {

//   movedCoord = move(...movedCoord);
//   if (inputList[movedCoord[0]][movedCoord[1]] === '#') {
//     result++;
//   }
//   console.log(inputList[movedCoord[0]][movedCoord[1]]);
// }

let x = 0;
let y = 0;
while(true) {

  if (y >= input.length) break;

  movedCoord = move(...movedCoord);
  // if(movedCoord[0] >= xLength) movedCoord[0] = 0;
  // console.log(
  //   y,
  //   inputList[y],
  //   movedCoord[0],
  //   movedCoord[1],
  //   inputList[movedCoord[1]][movedCoord[0]],
  // );
  const pos = input.charAt(y % input.length);
  console.log(pos);

  if (pos === '#') {
    result++;
  }
  y++;
}

console.log(result);
