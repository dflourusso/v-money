import defaults from './options'

function format (input, opt = defaults) {
  if (typeof input === 'number') {
    input = input.toFixed(fixed(opt.precision))
  }
  var numbers = onlyNumbers(input)
  var currency = numbersToCurrency(numbers, opt.precision)
  var parts = toStr(currency).split('.')
  var integer = parts[0]
  var decimal = parts[1]
  integer = addThousandSeparator(integer, opt.thousands)
  return opt.prefix + joinIntegerAndDecimal(integer, decimal, opt.decimal) + opt.suffix
}

function unformat (input, precision) {
  var numbers = onlyNumbers(input)
  var currency = numbersToCurrency(numbers, precision)
  return parseFloat(currency)
}

function onlyNumbers (input) {
  return toStr(input).replace(/\D+/g, '') || '0'
}

// Uncaught RangeError: toFixed() digits argument must be between 0 and 20 at Number.toFixed
function fixed (precision) {
  return between(0, precision, 20)
}

function between (min, n, max) {
  return Math.max(min, Math.min(n, max))
}

function numbersToCurrency (numbers, precision) {
  var exp = Math.pow(10, precision)
  var float = parseFloat(numbers) / exp
  return float.toFixed(fixed(precision))
}

function addThousandSeparator (integer, separator) {
  return integer.replace(/(\d)(?=(?:\d{3})+\b)/gm, `$1${separator}`)
}

function currencyToIntegerAndDecimal (float) {
  return toStr(float).split('.')
}

function joinIntegerAndDecimal (integer, decimal, separator) {
  return decimal ? integer + separator + decimal : integer
}

function toStr (value) {
  return value ? value.toString() : ''
}

function backspace (el) {
  el.value = onlyNumbers(el.value).slice(0, -1)
}

export {
  format,
  unformat,
  backspace,
  onlyNumbers
}
