const { input } = require('./input/day7');
const splittedLines = input.split('\n');

const example32 = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

const example126 = `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`;

function findLine(regex, lines) {
  return lines.find((line) => {
    return line.match(regex);
  });
}
let sum = [];

function find(color, lines) {
  const regex = new RegExp(`${color}.*?contain`);
  const matchedLine = findLine(regex, lines);
  const [shinyGold, sons] = matchedLine
    .replace(/bag(s?)(\.?)/g, '')
    .trim()
    .split(' contain ');
  const splittedSons = sons.split(',').map((s) => s.trim());
  return {
    color: shinyGold.trim(),
    qty: 1,
    count: 1,
    sons: splittedSons.map((son) => findSon(son, lines, 1)),
  };
}

function findSon(son, lines, count) {
  const regex = new RegExp('([0-9]{1}) ([a-z ]+)');
  const [, qty, color] = son.trim().match(regex);
  const regexColor = new RegExp(`${color}.*?contain`);
  const matchedLine = findLine(regexColor, lines);
  const [, sons] = matchedLine
  .replace(/bag(s?)(\.?)/g, '')
  .trim()
  .split(' contain ');
  const nephews =
  sons === 'no other' ? [] : sons.split(',').map((color) => color.trim());
  sum.push(count * qty);
  return {
    color: color,
    qty: qty,
    count: count * qty,
    sons: nephews.map((nephew) => findSon(nephew, lines, count * qty)),
  };
}

const dict32 = find('shiny gold', example32.split('\n'));
// console.log('Dict32: ', JSON.stringify(dict32, null, 2));
console.log(
  'Result32: ',
  sum.reduce((prev, curr) => prev + curr),
);

sum = [];
const dict126 = find('shiny gold', example126.split('\n'));
// console.log('Dict126:', JSON.stringify(dict126, null, 2));
console.log('Result126: ', sum.reduce((prev, curr) => prev + curr));

sum = [];
const dictInput = find('shiny gold', splittedLines);
// console.log('DictInput:', JSON.stringify(dictInput, null, 2));
console.log(
  'ResultInput: ',
  sum.reduce((prev, curr) => prev + curr),
);
