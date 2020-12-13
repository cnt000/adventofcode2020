const { input } = require('./input/day4');

const passports = input.split('\n\n');
const keyValues = passports
  .map(p=>p.replace(/ /g, '\n').split('\n').sort()
    .map(e => e.split(':')));

const validateHeight = ({ value, type }) => {
  // console.log(value, type);
  if (type === 'in') {
    return +value >=59 && +value <= 76;
  }
  if (type === 'cm') {
    return +value >= 150 && +value <= 193;
  }
}

const regex = (field, validation) => `(.*?)[ \n]*${field}:${validation}`;
const regexbyr = new RegExp(regex('byr', '(?<year>[0-9]+)'), 'm');
const regexiyr = new RegExp(regex('iyr', '(?<year>[0-9]+)'), 'm');
const regexeyr = new RegExp(regex('eyr', '(?<year>[0-9]+)'), 'm');
const regexhgt = new RegExp(regex('hgt', '((?<value>[0-9]{2,3})(?<type>cm|in))'), 'm');
const regexhcl = new RegExp(regex('hcl', '(#[0-9a-f]{6})'), 'm');
const regexecl = new RegExp(regex('ecl', '(amb|blu|brn|gry|grn|hzl|oth)'), 'm');
const regexpid = new RegExp(regex('pid', '[0-9]{9}'), 'm');

// byr(Birth Year) - four digits; at least 1920 and at most 2002.
// iyr(Issue Year) - four digits; at least 2010 and at most 2020.
// eyr(Expiration Year) - four digits; at least 2020 and at most 2030.

// hgt(Height) - a number followed by either cm or in:
// If cm, the number must be at least 150 and at most 193.
// If in, the number must be at least 59 and at most 76.

// hcl(Hair Color) - a # followed by exactly six characters 0 - 9 or a - f.
// ecl(Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
// pid(Passport ID) - a nine - digit number, including leading zeroes.

const isValid = (passport) => !!passport.match(regexbyr) &&
  1920 <= Number(passport.match(regexbyr)?.groups?.year) &&
  Number(passport.match(regexbyr)?.groups?.year) <= 2002 &&
  !!passport.match(regexiyr) &&
  2010 <= Number(passport.match(regexiyr)?.groups?.year) &&
  Number(passport.match(regexiyr)?.groups?.year) <= 2020 &&

  !!passport.match(regexeyr) &&
  2020 <= Number(passport.match(regexeyr)?.groups?.year) &&
  Number(passport.match(regexeyr)?.groups?.year) <= 2030 &&

  !!passport.match(regexhgt) &&
  validateHeight(passport.match(regexhgt).groups) &&
  !!passport.match(regexhcl) &&
  !!passport.match(regexecl) &&
  !!passport.match(regexpid);

let result = 0;
for (let i = 0; i < passports.length; i++) {
  if (isValid(passports[i])) {
    const debug = passports[i].replace(/ /g, '\n').split('\n').sort().map(e=>e.split(':'));
    console.log(debug);
    console.log(debug.length);
    console.log('--------------------------------------------');
    result++;
  }
}

// const validate = (key, val) => {
// const validator = {
//   byr() {
//     return true;
//   },
//   iyr() {},
//   eyr() {},
//   hgt() {},
//   hcl() {},
//   ecl() {},
//   pid() {},
// }
// };

// keyValues.map(passport => passport.map(fieldValue => validate(...fieldValue)));
console.log(result);
// console.log(keyValues);
// const year = Number(passports[3].match(regexbyr)?.groups?.year)
// console.log(passports[3], passports[3].match(regexbyr), year, 1920 >= Number(passports[3].match(regexbyr)?.groups?.year) <= 2002)
