const { input } = require('./input/day6');
const assert = require('assert').strict;

const countPositiveAnswers = (answers) => {
  const cleaned = answers
    .split('\n\n')
    .map(group =>
      Array.from(new Set(group.replace(/\s/g, '').split(''))).length
  );
  return cleaned.reduce((acc, curr) => acc + curr, 0);
}

const test = () => {
  assert.deepStrictEqual(countPositiveAnswers(`abc

a
b
c

ab
ac

a
a
a
a

b`), 11);
}

test();
console.log(countPositiveAnswers(input));
