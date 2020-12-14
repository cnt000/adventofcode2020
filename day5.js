const { input } = require('./input/day5');
const tickets = input.split('\n');
const assert = require('assert').strict;

const half = (cmd, coord) => {
  const [start, end] = coord;
  const length = (end - start) / 2 + start;
  if (cmd === 'F' || cmd === 'L') {
    return [start, Math.floor(length)]
  }
  if (cmd === 'B' || cmd === 'R') {
    return [Math.ceil(length), end]
  }
}

const getPlace = (str) => {
  let rows = [0, 127];
  let columns = [0, 7];
  for (let i = 0; i <= 7; i++) {
    rows = half(str[i], rows)
  }
  for (let i = 0; i < 3; i++) {
    columns = half(str[i + 7], columns)
  }
  return rows[0] * 8 + columns[0];
}

const testHalf = () => {
  assert.deepStrictEqual(half('F', [0, 127]), [0, 63]);
  assert.deepStrictEqual(half('F', [0, 63]), [0, 31]);
  assert.deepStrictEqual(half('F', [0, 31]), [0, 15]);
  assert.deepStrictEqual(half('F', [0, 15]), [0, 7]);
  assert.deepStrictEqual(half('F', [0, 7]), [0, 3]);
  assert.deepStrictEqual(half('F', [0, 3]), [0, 1]);
  assert.deepStrictEqual(half('F', [0, 1]), [0, 0]);
  assert.deepStrictEqual(half('B', [0, 127]), [64, 127]);
  assert.deepStrictEqual(half('B', [0, 63]), [32, 63]);
  assert.deepStrictEqual(half('B', [0, 31]), [16, 31]);
  assert.deepStrictEqual(half('B', [0, 15]), [8, 15]);
  assert.deepStrictEqual(half('B', [0, 7]), [4, 7]);
  assert.deepStrictEqual(half('B', [0, 3]), [2, 3]);
  assert.deepStrictEqual(half('B', [0, 1]), [1, 1]);
  assert.deepStrictEqual(half('F', [64, 127]), [64, 95]);
  assert.deepStrictEqual(half('B', [64, 127]), [96, 127]);
  assert.deepStrictEqual(half('F', [32, 63]), [32, 47]);
  assert.deepStrictEqual(half('B', [32, 63]), [48, 63]);
  assert.deepStrictEqual(half('F', [16, 31]), [16, 23]);
  assert.deepStrictEqual(half('B', [16, 31]), [24, 31]);
  assert.deepStrictEqual(half('F', [8, 15]), [8, 11]);
  assert.deepStrictEqual(half('B', [8, 15]), [12, 15]);
  assert.deepStrictEqual(half('F', [4, 7]), [4, 5]);
  assert.deepStrictEqual(half('B', [4, 7]), [6, 7]);
  assert.deepStrictEqual(half('F', [2, 3]), [2, 2]);
  assert.deepStrictEqual(half('B', [2, 3]), [3, 3]);
  // left and right
  assert.deepStrictEqual(half('R', [0, 7]), [4, 7]);
  assert.deepStrictEqual(half('L', [4, 7]), [4, 5]);
  assert.deepStrictEqual(half('R', [4, 5]), [5, 5]);
}
/*
BFFFBBFRRR: row 70, column 7, seat ID 567.
FFFBBBFRRR: row 14, column 7, seat ID 119.
BBFFBBFRLL: row 102, column 4, seat ID 820.
*/
const testTicket = () => {
  assert.deepStrictEqual(getPlace('BFFFBBFRRR'), 567);
  assert.deepStrictEqual(getPlace('FFFBBBFRRR'), 119);
  assert.deepStrictEqual(getPlace('BBFFBBFRLL'), 820);
}
testHalf();
testTicket();

const seatIds = tickets.map(ticket => getPlace(ticket));
console.log(Math.max(...seatIds));
