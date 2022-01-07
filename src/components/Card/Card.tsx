import React from "react"
import classNames from "classnames"

import styles from "./Card.module.scss"

type CardVariant = "default" | "warning"

type CardProps = {
  variant?: CardVariant
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = "default",
}) => {
  return (
    <div className={classNames(styles.Card, styles[variant])}>{children}</div>
  )
}
