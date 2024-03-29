const {isValid} = require('date-fns');

function isDate(value) {
  if (value === null || value === undefined) return false;
  return isValid(value);
}

module.exports = {isDate};
