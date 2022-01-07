import React, { useEffect, useState } from "react"
import { ethers } from "ethers"

import { Card } from "../../components/Card/Card"

import styles from "./Dashboard.module.scss"

import { ISherlock__factory } from "../../contracts/types/factories/ISherlock__factory"
import {
  SHERLOCK_SMART_CONTRACT_ADDRESS,
  USDC_SMART_CONTRACT_ADDRESS,
} from "../../utils/settings"
import { formatBigNumber } from "../../utils/numbers"

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
})

export const Dashboard = () => {
  const [poolBalance, setPoolBalance] = useState<ethers.BigNumber>()
  const [firstMoneyOut, setFirstMoneyOut] = useState<ethers.BigNumber>()

  useEffect(() => {
    const loadPoolData = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()

        const sherlock = ISherlock__factory.connect(
          SHERLOCK_SMART_CONTRACT_ADDRESS,
          signer
        )

        const usdcBalance = await sherlock.getStakersPoolBalance(
          USDC_SMART_CONTRACT_ADDRESS
        )
        const usdcFirstMoneyOut = await sherlock.getFirstMoneyOut(
          USDC_SMART_CONTRACT_ADDRESS
        )

        setPoolBalance(usdcBalance)
        setFirstMoneyOut(usdcFirstMoneyOut)
      } catch (error) {
        console.log(error)
      }
    }

    loadPoolData()
  }, [])

  return (
    <div className={styles.Dashboard}>
      <div className={styles.row}>
        <div className={styles.box}>
          <Card>
            <h2>TOTAL FUNDS</h2>
            <span>{poolBalance && formatBigNumber(poolBalance)}</span>
          </Card>
        </div>
        <div className={styles.box}>
          <Card>
            <h2>FIRST MONEY OUT POOL</h2>
            <span>{firstMoneyOut && formatBigNumber(firstMoneyOut)}</span>
          </Card>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.box}>
          <Card>
            <h2>STAKING POOLS</h2>
          </Card>
        </div>
      </div>
    </div>
  )
}
