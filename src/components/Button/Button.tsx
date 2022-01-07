import React from "react"
import classNames from "classnames"

import styles from "./Button.module.scss"

type ButtonProps = {
  loading?: boolean
  onClick?: React.MouseEventHandler
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  loading,
}) => {
  return (
    <button
      className={classNames(styles.Button, {
        [styles.loading]: loading,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
