const { input } = require('./input/day7');
const splittedLines = input.split('\n');
let dict = {}

const contain = (colors, lines) => {
  const fathers = colors.map(color => {
    const onlyColor = color.replace(/ bags$/, '');
    const regexContain = new RegExp(`(?<father>.*?) contain (?<sons>.*?${color}.*?)`);
    let results = [];
    lines.forEach(line => {
      const matches = line.match(regexContain);
      const father = matches?.groups?.father?.replace(/ bags$/, '');
      if (father) {
        results.push(father);
        // if (dict[color] instanceof Array) {
        //   dict[onlyColor].push({ father, son: onlyColor});
        // } else {
        //   dict[onlyColor] = [{ father, son: onlyColor }]
        // }
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

const exampleRulesContain = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.
sdasd celeste bags contain 1 cavolo verde bags, 2 lorasdasri gialli bags.
cavolo verde bags contain 1 light red bag, 2 lorri gialli bags.`;

const fathers = new Set(recurse(['shiny gold bag'], [], splittedLines));
console.log('Exercise: ', [...fathers].length);
const example = new Set(recurse(['shiny gold'], [], exampleRulesContain.split('\n')));
console.log('Example: ', [...example].length);
// console.log(dict);
