import { ethers } from "ethers"
import { ISherlock__factory } from "../contracts/types/factories/ISherlock__factory"
import {
  SHERLOCK_SMART_CONTRACT_ADDRESS,
  SHERX_SMART_CONTRACT_ADDRESS,
  USDC_SMART_CONTRACT_ADDRESS,
} from "../utils/settings"

const TOKENS = [
  {
    address: USDC_SMART_CONTRACT_ADDRESS,
    divider: 6,
  },
  {
    address: SHERX_SMART_CONTRACT_ADDRESS,
    divider: 18,
  },
]

export const getPoolSizeUSD = async (
  provider: ethers.providers.Provider
): Promise<Number | undefined> => {
  try {
    const sherlock = ISherlock__factory.connect(
      SHERLOCK_SMART_CONTRACT_ADDRESS,
      provider
    )

    let totalBalanceUSD = 0.0

    for (let i = 0; i < TOKENS.length; i++) {
      const token = TOKENS[i]
      const isStake = await sherlock.isStake(token.address)

      if (!isStake) continue

      const balance = await sherlock.getStakersPoolBalance(token.address)
      const formattedBalance = Number(
        ethers.utils.formatUnits(balance, token.divider)
      )
      const price = 1.0

      totalBalanceUSD += formattedBalance * price
    }

    return totalBalanceUSD
  } catch (error) {
    console.log(error)
  }
}

export const getFirstMoneyOutUSD = async (
  provider: ethers.providers.Provider
): Promise<Number | undefined> => {
  try {
    const sherlock = ISherlock__factory.connect(
      SHERLOCK_SMART_CONTRACT_ADDRESS,
      provider
    )

    let totalFirstMoneyOutUSD = 0.0

    for (let i = 0; i < TOKENS.length; i++) {
      const token = TOKENS[i]
      const isStake = await sherlock.isStake(token.address)

      if (!isStake) continue

      const firstMoneyOut = await sherlock.getFirstMoneyOut(token.address)

      const formattedFirstMoneyOut = Number(
        ethers.utils.formatUnits(firstMoneyOut, token.divider)
      )
      const price = 1.0

      totalFirstMoneyOutUSD += formattedFirstMoneyOut * price
    }

    return totalFirstMoneyOutUSD
  } catch (error) {
    console.error(error)
  }
}
