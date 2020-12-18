const { input } = require('./input/day7');
const assert = require('assert').strict;
const splittedLines = input.split('\n');

const contain = (colors, lines) => {
  const fathers = colors.map(color => {
    const regexContain = new RegExp(`(?<father>.*?) contain(.*?)(?<qty>[0-9]{1}) ${color}`);
    let results = [];
    lines.forEach(line => {
      const matches = line.match(regexContain);
      if (matches?.groups?.father) {
        results.push(matches?.groups?.father)
      }
    });
    return results;
  })
  return fathers.flat(Infinity);
};

const recurse = (colors, fathers, lines) => {
  const results = contain(colors, lines);
  if(results.length === 0) {
    return fathers;
  }
  fathers = [...fathers, ...results];
  return recurse(results, fathers, lines);
}

// const fathers = new Set(recurse(['shiny gold bag'], [], splittedLines));
// console.log([...fathers].length);

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
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags, 3 bright white bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

const fathers = new Set(recurse(['shiny gold bag'], [], splittedLines));
console.log([...fathers].length);
