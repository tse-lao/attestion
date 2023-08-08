"use client"


import LoginButton from "@/components/core/account/login-button"
import { CONTRACTS } from "@/constants/contracts"
import Link from "next/link"
import { useAccount } from "wagmi"

export default function Home() {
  const {address} = useAccount()
  
  
  return (
    <main className="flex min-h-screen  flex-col items-center justify-between p-24">
        {address ? (
          <div className="flex flex-col gap-4">
            <h1>Welcome you are logged in! Please feel free to look and play arround</h1>
            
            <div>
              <h3>Contracts</h3>
              <span className="grid">
                <Link className="text-green-300" 
                href={`https://goerli-optimism.etherscan.io/address/${CONTRACTS.attestionFactory.optimistic.contract}#code`} target="_blank">Optimistic Goerli attestationFactory Contract</Link>
                <Link className="text-green-300" 
                href={`https://goerli-optimism.etherscan.io/address/${CONTRACTS.attestation.optimistic.contract}#code`} target="_blank">Optimistic Goerli Attestation </Link>
              </span>
            </div>
          </div>
        ): (
          <div className="flex flex-col items-center justify-center">
            <LoginButton />
          </div>
        )}
    </main>
  )
}
