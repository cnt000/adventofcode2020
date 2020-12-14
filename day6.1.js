const { input } = require('./input/day6');
const assert = require('assert').strict;

const countPositiveAnswers = (answers) => {
  let res = 0;
  answers
    .split('\n\n')
    .map((group) => getIntersectionLetters(group.split('\n')))
    .forEach(letters => res += letters.length);
  return res;
};

const getAlphabetPosition = (char) => char.charCodeAt(0) - 97;

const getIntersectionLetters = (words) => {
  let res = [];
  const max = words.length;
  let letters = Array(26).fill(0);
  words.forEach((word) =>
    word.split('').forEach((char) => {
      letters[getAlphabetPosition(char)] = letters[getAlphabetPosition(char)] + 1;
      if (letters[getAlphabetPosition(char)] >= max) {
        res.push(char);
      }
    }),
  );

  return Array.from(new Set(res)).join('');
};

const test = () => {
  assert.deepStrictEqual(
    countPositiveAnswers(`abc

a
b
c

ab
ac

a
a
a
a

b`),
    6,
  );
};

const testAlphabetPosition = () => {
  assert.deepStrictEqual(
    getIntersectionLetters([
      'abc',
      'ab',
      'ca',
    ]),
    'a',
  );
};

test();
testAlphabetPosition();

console.log(countPositiveAnswers(input));
