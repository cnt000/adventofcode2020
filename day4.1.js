const { input } = require('./input/day4');

const passports = input.split('\n\n');

const isHeightValid = ({ value, type }) => {
  if (type === 'in') {
    return +value >=59 && +value <= 76;
  }
  if (type === 'cm') {
    return +value >= 150 && +value <= 193;
  }
  return false;
}

const regex = (field, validation) => `(.*?)[ \n]*${field}:${validation}`;
const regexbyr = new RegExp(regex('byr', '(?<year>[0-9]{4})'), 'm');
const regexiyr = new RegExp(regex('iyr', '(?<year>[0-9]{4})'), 'm');
const regexeyr = new RegExp(regex('eyr', '(?<year>[0-9]{4})'), 'm');
const regexhgt = new RegExp(regex('hgt', '((?<value>[0-9]{2,3})(?<type>cm|in))'), 'm');
const regexhcl = new RegExp(regex('hcl', '(#[0-9a-f]{6})'), 'm');
const regexecl = new RegExp(regex('ecl', '(amb|blu|brn|gry|grn|hzl|oth)'), 'm');
const regexpid = new RegExp(regex('pid', '(?<pid>[0-9]+)'), 'm');

const isValid = (passport) => !
  1920 <= Number(passport.match(regexbyr)?.groups?.year) &&
  Number(passport.match(regexbyr)?.groups?.year) <= 2002 &&
  2010 <= Number(passport.match(regexiyr)?.groups?.year) &&
  Number(passport.match(regexiyr)?.groups?.year) <= 2020 &&
  2020 <= Number(passport.match(regexeyr)?.groups?.year) &&
  Number(passport.match(regexeyr)?.groups?.year) <= 2030 &&
  !!passport.match(regexhgt) &&
  isHeightValid(passport.match(regexhgt)?.groups) &&
  !!passport.match(regexhcl) &&
  !!passport.match(regexecl) &&
  passport.match(regexpid)?.groups?.pid.length === 9;

let result = 0;
for (let i = 0; i < passports.length; i++) {
  if (isValid(passports[i])) {
    result++;
  }
}

console.log(result);
