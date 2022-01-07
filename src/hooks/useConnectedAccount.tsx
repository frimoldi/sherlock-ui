import { useEffect, useState } from "react"
import { ethers } from "ethers"

import { createGenericContext } from "./utils/createGenericContext"

type UseConnectedAccount = {
  connectedAccount: string | undefined | null
  ensName: string | undefined | null
  loading: boolean
  connectAccount: () => {}
}

const [useConnectedAccount, ConnectedAccountContextProvider] =
  createGenericContext<UseConnectedAccount>()

export const ConnectedAccountProvider: React.FC = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState<string | null>()
  const [ensName, setEnsName] = useState<string | null>()
  const [loading, setLoading] = useState(false)

  // Load connected account, if any
  useEffect(() => {
    const checkConnectedAccount = async () => {
      try {
        const { ethereum } = window
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()

        if (signer) {
          const address = await signer.getAddress()
          setConnectedAccount(address)
        } else {
          setConnectedAccount(null)
        }
      } catch (error) {
        console.error(error)
      }
    }

    checkConnectedAccount()
  })

  // ENS name lookup
  useEffect(() => {
    const lookupAddress = async () => {
      if (connectedAccount) {
        const { ethereum } = window
        const provider = new ethers.providers.Web3Provider(ethereum)

        const name = await provider.lookupAddress(connectedAccount)

        console.log("name for " + connectedAccount)
        console.log(name)

        setEnsName(name)
      }
    }

    try {
      lookupAddress()
    } catch (error) {
      console.log(error)
    }
  }, [connectedAccount])

  const connectAccount = async () => {
    try {
      const { ethereum } = window
      const provider = new ethers.providers.Web3Provider(ethereum)

      setLoading(true)
      await provider.send("eth_requestAccounts", [])
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ConnectedAccountContextProvider
      value={{ connectAccount, connectedAccount, loading, ensName }}
    >
      {children}
    </ConnectedAccountContextProvider>
  )
}

export { useConnectedAccount }
