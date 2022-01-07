import React from "react"

import styles from "./NavigationBar.module.scss"
import logo from "../../logo.svg"

type NavigationBarProps = {}

export const NavigationBar: React.FC<NavigationBarProps> = ({ children }) => {
  return (
    <div className={styles.NavigationBar}>
      <div className={styles.logo}>
        <img src={logo} height="100%" alt="Sherlock" />
      </div>
      <div className={styles.buttons}>{children}</div>
    </div>
  )
}
