import React from "react"

import styles from "./App.module.scss"

import { Dashboard } from "./pages/Dashboard/Dashboard"

import { NavigationBar } from "./components/NavigationBar/NavigationBar"
import { Button } from "./components/Button/Button"
import { useConnectedAccount } from "./hooks/useConnectedAccount"

import { shortAddress } from "./utils/addresses"

function App() {
  const {
    loading: walletIsLoading,
    connectAccount,
    ensName,
    connectedAccount,
  } = useConnectedAccount()

  console.log(connectedAccount)

  return (
    <div className={styles.App}>
      <NavigationBar>
        <Button>Breakdown</Button>
        <Button>Dashboard</Button>
        <Button loading={walletIsLoading} onClick={() => connectAccount()}>
          {ensName ||
            (connectedAccount && shortAddress(connectedAccount)) ||
            (walletIsLoading ? "Loading ..." : "Connect wallet")}
        </Button>
      </NavigationBar>
      <div className={styles.content}>
        <Dashboard />
      </div>
    </div>
  )
}

export default App
