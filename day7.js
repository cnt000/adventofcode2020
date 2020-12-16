const { input } = require('./input/day7');
const assert = require('assert').strict;

const lines = input.split('\n');
const fatherAndSons = lines.map(line => line.split(' contain '));
let result = [];

const contain = (input, color) => {
  const regexColor = new RegExp(
    `${color}`,
  );

  for (let i = 0; i < fatherAndSons.length; i++) {
    if(fatherAndSons[i][1].match(regexColor)) {
      result.push(fatherAndSons[i][0]);
    }
  }
  result.forEach((color) => contain('', color));



  // const regexContain = new RegExp(`(?<father>.*?) contain [0-9]{1} ${color}`);
  // const regexComma = new RegExp(
  //   `(?<father>.*?) contain (.*), [0-9]{1} ${color}`,
  // );
  // return [
  //   ...lines
  //     .map((line) => line.match(regexContain)?.groups?.father)
  //     .filter(Boolean),
  //   ...lines
  //     .map((line) => line.match(regexComma)?.groups?.father)
  //     .filter(Boolean),
  // ];
};

const atLeastOne = (initialColor, input) => {
  const res = contain(input, initialColor);
  const all = [...res, res.map((color) => contain(input, color))].flat(
    Infinity,
  );
  const allNoDouble = new Set(all);

  return [...allNoDouble].length;
};

const exampleRulesContain = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

const exampleRulesComma = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 dark olive bag, 1 shiny gold bag.
muted yellow bags contain 5 faded blue bags, 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

const exampleRulesMixed = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 dark olive bag, 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

console.log(atLeastOne('shiny gold bag', input));
// console.log(contain(exampleRulesMixed, 'shiny gold bag'));


/////////////TEST/////////////////////////////////////////////////
const test = () => {
  assert.deepStrictEqual(atLeastOne('shiny gold bag', exampleRulesContain), 4);
};

const testContain = () => {
  assert.deepStrictEqual(
    contain(exampleRulesContain, 'shiny gold bag').sort(),
    ['bright white bags', 'muted yellow bags'],
  );
};
const testComma = () => {
  assert.deepStrictEqual(contain(exampleRulesComma, 'shiny gold bag').sort(), [
    'bright white bags',
    'muted yellow bags',
  ]);
};
const testMixed = () => {
  assert.deepStrictEqual(contain(exampleRulesMixed, 'shiny gold bag').sort(), [
    'bright white bags',
    'muted yellow bags',
  ]);
};

test();
testComma();
testContain();
testMixed();
