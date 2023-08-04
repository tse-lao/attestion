"use client"


import LoginButton from "@/components/core/account/login-button"
import { useAccount } from "wagmi"

export default function Home() {
  const {address} = useAccount()
  
  
  return (
    <main className="flex min-h-screen  flex-col items-center justify-between p-24">
        {address ? (
          <div>
            Lets go!!
          </div>
        ): (
          <div className="flex flex-col items-center justify-center">
            <LoginButton />
          </div>
        )}
    </main>
  )
}
