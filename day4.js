const { input } = require('./input/day4');
const { input } = require('./input/day4');

const passports = input.split('\n\n');
const regex = (field) => `(.*?)[ \n]*${field}:(.*?)`;

const regexbyr = new RegExp(regex('byr'), 'm');
const regexiyr = new RegExp(regex('iyr'), 'm');
const regexeyr = new RegExp(regex('eyr'), 'm');
const regexhgt = new RegExp(regex('hgt'), 'm');
const regexhcl = new RegExp(regex('hcl'), 'm');
const regexecl = new RegExp(regex('ecl'), 'm');
const regexpid = new RegExp(regex('pid'), 'm');

const isValid = (passport) => !!passport.match(regexbyr) &&
  !!passport.match(regexiyr) &&
  !!passport.match(regexeyr) &&
  !!passport.match(regexhgt) &&
  !!passport.match(regexhcl) &&
  !!passport.match(regexecl) &&
  !!passport.match(regexpid);

let result = 0;
for (let i = 0; i < passports.length; i++) {
  if(isValid(passports[i])) {
    result++
  }
}
console.log(result);
