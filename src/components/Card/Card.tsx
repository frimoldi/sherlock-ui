import React from "react"

import styles from "./Card.module.scss"

export const Card: React.FC = ({ children }) => {
  return <div className={styles.Card}>{children}</div>
}
