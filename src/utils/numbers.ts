import { BigNumberish, ethers } from "ethers"
import numeral from "numeral"

export const formatBigNumber = (
  bigNumber: ethers.BigNumberish,
  unitName: BigNumberish = 6
): string => {
  const bigNumberAsString = ethers.utils.formatUnits(bigNumber, unitName)

  return numeral(bigNumberAsString).format("$0,0.00")
}
