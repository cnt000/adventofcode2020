const { input } = require('./input/day10');
const splittedLines = input.split('\n').map(n => +n);

const example = `16
10
15
5
1
11
7
19
6
12
4`.split('\n').map(n => +n);

const example2 = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`.split('\n').map(n => +n);

function compare(a, b) {
  return a - b;
}

function order(input) {
  const ordered = input.sort(compare);
  return [0, ...ordered, ordered[ordered.length - 1] + 3];
}

function differencesBy1(input) {
  return input.filter((el, i) => {
    return i === 0 ? false : (input[i] - input[i - 1] === 1)
  });
}

function differencesBy3(input) {
  return input.filter((el, i) => {
    return i === 0 ? false : (input[i] - input[i - 1] === 3)
  });
}

console.log(
  'Result:',
  // order(example),
  differencesBy1(order(example)).length,
  differencesBy3(order(example)).length,
);

console.log(
  'Result:',
  // order(example),
  differencesBy1(order(example2)).length,
  differencesBy3(order(example2)).length,
);

console.log(
  // order(example),
  differencesBy1(order(splittedLines)).length,
  differencesBy3(order(splittedLines)).length,
  'Result Input:',
  differencesBy1(order(splittedLines)).length *
  differencesBy3(order(splittedLines)).length,
);
