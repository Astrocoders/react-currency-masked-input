const getDigitsFromValue = (value = '') => value.replace(/(-(?!\d))|[^0-9|-]/g, '') || ''

const padDigits = digits => {
  const desiredLength = 3
  const actualLength = digits.length

  if (actualLength >= desiredLength) {
    return digits
  }

  const amountToAdd = desiredLength - actualLength
  const padding = '0'.repeat(amountToAdd)

  return padding + digits
}

const removeLeadingZeros = number => number.replace(/^0+([0-9]+)/, '$1')

const addDecimalToNumber = number => {
  const centsStartingPosition = number.length - 2
  const millions = removeLeadingZeros(
    number.substring(0, 3)
  )
  const thousands = removeLeadingZeros(
    number.substring(4, 7)
  )
  const dollars = removeLeadingZeros(
    number.substring(8, centsStartingPosition)
  )
  const cents = number.substring(centsStartingPosition)
  return `${millions}.${thousands}.${dollars},${cents}`
}

export const toCurrency = value => {
  const digits = getDigitsFromValue(value)
  const digitsWithPadding = padDigits(digits)
  return addDecimalToNumber(digitsWithPadding)
}

