import React, { useEffect, useState } from "react"
import { ethers } from "ethers"

import { Card } from "../../components/Card/Card"

import styles from "./Dashboard.module.scss"

import { ISherlock__factory } from "../../contracts/types/factories/ISherlock__factory"
import {
  SHERLOCK_SMART_CONTRACT_ADDRESS,
  USDC_SMART_CONTRACT_ADDRESS,
} from "../../utils/settings"

export const Dashboard = () => {
  const [poolBalance, setPoolBalance] = useState<ethers.BigNumber>()
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

        setPoolBalance(usdcBalance)
      } catch (error) {
        console.log(error)
      }
    }

    loadPoolData()
  })

  return (
    <div className={styles.Dashboard}>
      <div className={styles.row}>
        <div className={styles.box}>
          <Card>
            <h2>TOTAL FUNDS</h2>
            <span>{poolBalance?.toString()}</span>
          </Card>
        </div>
        <div className={styles.box}>
          <Card>FIRST MONEY OUT POOL</Card>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.box}>
          <Card>FIRST MONEY OUT POOL</Card>
        </div>
      </div>
    </div>
  )
}
