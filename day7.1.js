const { input } = require('./input/day7');
const assert = require('assert').strict;
const splittedLines = input.split('\n');
let piero = {};

const contain = (colors, lines) => {
  const fathers = colors.map(color => {
    const regexContain = new RegExp(`(?<father>.*?) bags contain (?<sons>.*?${color})`);
    let results = [];
    lines.forEach(line => {
      const matches = line.match(regexContain);
      const father = matches?.groups?.father;
      if (father) {
        results.push(father);
        if (dict[color] instanceof Array) {
          dict[color].push({ father, son: color });
        } else {
          dict[color] = [{ father, son: color }]
        }
      }
    });
    return results;
  })
  return fathers.flat(Infinity);
};

const recurse = (colors, fathers, lines) => {
  const results = contain(colors, lines);
  if (results.length === 0) {
    return fathers;
  }
  fathers = [...fathers, ...results];
  return recurse(results, fathers, lines);
}

const makeDict = (colors, lines, dict) => {
  colors.forEach(color => {
    lines
      .forEach(line => {
        const regex = new RegExp(`^${color.color}`);
        const colorMatches = line.match(regex);
        if (colorMatches != null) {
          const [father, sons] = line.split(' contain ');
          // const [, qty, colorName] = color.color.match(/([0-9]{1}) ([a-z ]+)/);
          const colorSons = sons
            .split(', ')
            .map(e => e.replace(/ bag(s?\.?)/, '').trim());
          const colorSonsArray = colorSons.map(colorSon => ({ qty: colorSon.substring(0, 1), color: colorSon.substring(2, colorSon.length) }));
          const thisDict = {
            color: color.color,
            qty: color.qty,
            sons: colorSons[0] === 'no other' ? [] :colorSonsArray,
          };
          dict[color.color] = thisDict;
          if(thisDict.sons.length != 0) {
            makeDict(thisDict.sons, lines, dict);
          }
        }
        // dict[father.replace(/ bag(s?\.?)/, '').trim()] = sons
        //   .split(', ').map(e =>
        //     e.replace(/ bag(s?\.?)/, '').trim()
        //   )
      });
  })
}

function searchMoreDepthSons(dict) {
  if(dict.sons instanceof Array) {
    return dict.sons.forEach(son => searchMoreDepthSons(son));
  }
  return dict;
}

// assert.deepStrictEqual(searchMoreDepthSons({
//   color: 'dark olive',
//   qty: '1',
//   sons: [
//     { qty: '3', color: 'faded blue' },
//     { qty: '4', color: 'dotted black' }
//   ]
// }), []);


let counter = 0;
let level = 0;
const count = (color) => {
  level++;
  const onlyColor = color.substring(2, color.length)
  const sons = dict[onlyColor];
  const regex = '([0-9]{1})';
  if (sons[0] === 'no other') {
    return;
  }
  sons.forEach(s => {
    counter = +s.match(regex)[0] * Number(color.substring(0, 1))
    console.log(counter, s.match(regex)[0], Number(color.substring(0, 1)));
  });
  sons.forEach(s => count(s));
}

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

// const fathers = new Set(recurse(['shiny gold'], [], splittedLines));
// console.log('Exercise: ', [...fathers].length);
// const example = new Set(recurse(['shiny gold'], [], exampleRulesContain.split('\n')));
// console.log('Example: ', [...example].length);
makeDict([
  { qty: '1', color: 'dark olive' },
  { qty: '2', color: 'vibrant plum' }
], example32.split('\n'), piero);
console.log(JSON.stringify(piero, null, 2));
console.log(Object.keys(piero))
// count('1 shiny gold');
// console.log(counter);
console.log('----------------------------------');
const zio = {};
makeDict([
  { qty: '2', color: 'dark red' }
], example126.split('\n'), zio);
console.log(JSON.stringify(zio, null, 2));
