const {isValid} = require('date-fns');
/**
 * [isDate]
 * Defines if a value is a valid date.
 * @param {any} value
 * @return {boolean}
 */
function isDate(value) {
  if (value === null || value === undefined) return false;
  return isValid(value);
}

module.exports = {isDate};
