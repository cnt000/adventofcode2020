const dict32 = {
  '1 shiny gold': {
    '1 dark olive': {
      '3 faded blue': {},
      '4 dotted black': {},
    },
    '2 vibrant plum': {
      '5 faded blue': {},
      '6 dotted black': {},
    },
  },
};
// 1 * 1 + 2 = 3
// 7 * 1 = 7
// 11 * 2 = 22
// = 32

const example32 = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

metodo('shiny gold');

function metodo(color) {
  // prendi input e trova shiny gold -> poi setta le prop dei figli
  // chiama una funzione che prende le prop dei figli e cerca nelle input i figli
}

// --------------------------------------------------------------------

const dict126 = {
  '1 shiny gold': {
    '2 dark red': {
      '2 dark orange': {
        '2 dark yellow': {
          '2 dark green': {
            '2 dark blue': {
              '2 dark violet': {},
            },
          },
        },
      },
    },
  },
};
// 1 * 2 = 2
// 2 * 2 = 4
// 2 * 4 = 8
// 2 * 8 = 16
// 2 * 16 = 32
// 2 * 32 = 64
// = 126
