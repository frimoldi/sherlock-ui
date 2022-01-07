import React, { useEffect, useState } from "react"
import { ethers } from "ethers"

import { Card } from "../../components/Card/Card"

import styles from "./Dashboard.module.scss"

import { formatToCurrency } from "../../utils/numbers"
import { getFirstMoneyOutUSD, getPoolSizeUSD } from "../../sherlock/pool"

export const Dashboard = () => {
  const [poolBalance, setPoolBalance] = useState<Number>()
  const [firstMoneyOut, setFirstMoneyOut] = useState<Number>()

  useEffect(() => {
    const loadPoolData = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()

        const usdBalance = await getPoolSizeUSD(signer)
        const usdFirstMoneyOut = await getFirstMoneyOutUSD(signer)

        setPoolBalance(usdBalance)
        setFirstMoneyOut(usdFirstMoneyOut)
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
          <Card variant="warning">
            <p>
              Warning: Do not stake unless you are in the whitelisted guarded
              launch. <strong>Your funds will be at risk.</strong>
            </p>
          </Card>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.box}>
          <Card>
            <h2>TOTAL FUNDS</h2>
            <span className={styles.value}>
              {poolBalance && formatToCurrency(poolBalance)}
            </span>
          </Card>
        </div>
        <div className={styles.box}>
          <Card>
            <h2>FIRST MONEY OUT POOL</h2>
            <span className={styles.value}>
              {firstMoneyOut && formatToCurrency(firstMoneyOut)}
            </span>
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
