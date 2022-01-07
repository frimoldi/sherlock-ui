import React from "react"

import styles from "./Dashboard.module.scss"

import { Card } from "../../components/Card/Card"

export const Dashboard = () => {
  return (
    <div className={styles.Dashboard}>
      <div className={styles.row}>
        <div className={styles.box}>
          <Card>TOTAL FUNDS</Card>
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
