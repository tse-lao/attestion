"use client"


import LoginButton from "@/components/core/account/login-button"
import Worldcoin from "@/components/core/worldcoin/worldcoin"
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
              <h3>WorldCoin</h3>
              <Worldcoin />
            </div>
            <div>
              <h3>Contracts</h3>
              <span className="grid">
                <DisplayLinks />
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


function DisplayLinks () {
  return (
    <div>
      {Object.entries(CONTRACTS).map(([contractName, networks]) => (
        <div key={contractName} className="flex flex-col gap-2">
          <h2 className="mt-4 text-2xl ">{contractName}</h2>
          {Object.entries(networks).map(([networkId, details]) => (
            <div key={networkId}>
              {networkId === "420" ? (
                <Link href={`https://goerli-optimism.etherscan.io/address/${details.contract}`} target="_blank" className="text-red-300">
                  {details.contract}
                </Link>
              ) : (
                <Link href={` https://basescan.org/address/${details.contract}`} target="_blank" className="text-blue-300">
                  {details.contract}
                </Link>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};