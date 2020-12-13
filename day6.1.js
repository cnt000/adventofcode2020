const { input } = require('./input/day6');
const assert = require('assert').strict;

const countPositiveAnswers = (answers) => {
  return answers
    .split('\n\n')
    .map(group => group
      .split('\n')
      //.reduce((acc, curr) => [...curr, ...acc], acc), [])
    );
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

b`), 6);
}

// test();
console.log(countPositiveAnswers(input));
