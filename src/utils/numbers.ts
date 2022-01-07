import numeral from "numeral"

export const formatToCurrency = (number: Number): string => {
  return numeral(number).format("$0,0.00")
}
