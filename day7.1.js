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

function find(color, lines) {
  let result = {};
  const regex = new RegExp(`${color}.*?contain`)
  const matchedLine = lines.find(line => {
    return line.match(regex);
  });
  const [shinyGold, sons] = matchedLine.replace(/bag(s?)(\.?)/g, '').trim().split(' contain ');
  const splittedSons = sons.split(',').map(s => s.trim());
  result = {
    color: shinyGold.trim(),
    qty: 1,
    sons: splittedSons.map(son => findSon(son, lines)),
  };
  return result;
}

function findSon(son, lines) {
  let abcd = {};
  const regex = new RegExp('([0-9]{1}) ([a-z ]+)');
  const [, qty, color] = son.trim().match(regex);
  const regexColor = new RegExp(`${color}.*?contain`)
  const matchedLine = lines.find(line => {
    return line.match(regexColor);
  });
  const [, sons] = matchedLine.replace(/bag(s?)(\.?)/g, '').trim().split(' contain ');
  if (sons === 'no other') {
    abcd = [];
  } else {
    abcd = sons.split(',').map(color => color.trim());
  }
  return {
    color: color,
    qty: qty,
    sons: abcd.map(aaa => findSon(aaa, lines))
  }
}

const dict32 = find('shiny gold', example32.split('\n'));
console.log(JSON.stringify(dict32, null, 2));

const dict126 = find('shiny gold', example126.split('\n'));
console.log(JSON.stringify(dict126, null, 2));

// const dictInput = find('shiny gold', splittedLines);
// console.log(JSON.stringify(dictInput, null, 2));
