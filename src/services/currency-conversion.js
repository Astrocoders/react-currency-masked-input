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

  const cents = number.substring(centsStartingPosition)
  const dollars = removeLeadingZeros(number.substring(0, centsStartingPosition))
  
  return `${dollars},${cents}`
}

const handleThousands = number => {
  const dollarsStartingPosition = number.length - 6

  const dollars = number.substring(dollarsStartingPosition)
  const thousands = removeLeadingZeros(number.substring(0, dollarsStartingPosition))

  return `${thousands}.${dollars}`
}

const handleMillions = number => {
  const thousandsStartingPosition = number.length - 10

  const thousands = number.substring(thousandsStartingPosition)
  const millions = removeLeadingZeros(number.substring(0, thousandsStartingPosition))

  return `${millions}.${thousands}`
}

export const toCurrency = value => {
  const digits = getDigitsFromValue(value)
  const digitsWithPadding = padDigits(digits)
  const realNumber = removeLeadingZeros(digitsWithPadding);

  if (realNumber.length <= 5) {
    return addDecimalToNumber(digitsWithPadding)
  } else {
    if (realNumber.length > 5 && realNumber.length <=8) {
      const numberWithDecimals = addDecimalToNumber(digitsWithPadding)
      return handleThousands(numberWithDecimals)
    } else {
      const numberWithDecimals = addDecimalToNumber(digitsWithPadding)
      const thousandsWithDecimals = handleThousands(numberWithDecimals)
      return handleMillions(thousandsWithDecimals)
    }
  }
}

