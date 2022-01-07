import React, { useEffect, useState } from "react"
import { ethers } from "ethers"

import { Card } from "../../components/Card/Card"

import styles from "./Dashboard.module.scss"

import { formatToCurrency } from "../../utils/numbers"
import {
  getFirstMoneyOutUSD,
  getPoolSizeUSD,
  getStakingPoolsData,
  StakingPoolData,
} from "../../sherlock/pool"
import usdcLogo from "../../images/tokens/usdc.svg"
import sherxLogo from "../../images/tokens/sherx.svg"

const logos: Record<string, string> = {
  usdc: usdcLogo,
  sherx: sherxLogo,
}

export const Dashboard = () => {
  const [poolBalance, setPoolBalance] = useState<Number>()
  const [firstMoneyOut, setFirstMoneyOut] = useState<Number>()
  const [stakingPools, setStakingPools] = useState<StakingPoolData[]>()

  useEffect(() => {
    const loadPoolData = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        const usdBalance = await getPoolSizeUSD(provider)
        const usdFirstMoneyOut = await getFirstMoneyOutUSD(provider)
        const stakingPoolsData = await getStakingPoolsData()

        setPoolBalance(usdBalance)
        setFirstMoneyOut(usdFirstMoneyOut)
        setStakingPools(stakingPoolsData)

        console.log(stakingPoolsData)
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
            <div className={styles.pools}>
              <div className={styles.poolHeader}>
                <div className={styles.logo}>
                  <h4>TOKEN</h4>
                </div>
                <div></div>
                <div className={styles.poolSize}>
                  <h4>POOL SIZE</h4>
                </div>
                <div className={styles.apy}>
                  <h4>APY</h4>
                </div>
              </div>
              {stakingPools &&
                stakingPools.map((pool, index) => (
                  <Card variant="light" key={index}>
                    <div className={styles.poolRow}>
                      <div className={styles.logo}>
                        <img
                          src={logos[pool.symbol.toLowerCase()]}
                          alt={pool.name}
                          width={50}
                        />
                      </div>
                      <div>
                        <span>{pool.name}</span>
                      </div>
                      <div>
                        <span>{pool.stake}</span>
                      </div>
                      <div>
                        <span>{pool.apy}</span>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
