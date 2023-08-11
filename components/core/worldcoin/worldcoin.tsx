"use client"
import { Button } from '@/components/ui/button'
import { CONTRACTS } from '@/constants/contracts'
import { decode } from '@/lib/wld'
import { IDKitWidget, ISuccessResult } from '@worldcoin/idkit'
import { useEffect, useState } from 'react'
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'

export default function Worldcoin() {
	const { address } = useAccount()
	const [claimed, setClaimed] = useState(false)
	const [proof, setProof] = useState<ISuccessResult | null>(null)
	const {data: isClaimed, isLoading} = useContractRead({
		address: CONTRACTS.worldcoin[420].contract,
		abi: CONTRACTS.worldcoin[420].abi,
		functionName: 'balanceOf',
		args: [address],
	});
	
	const {data: readFees, isLoading: readFeesLoading} = useContractRead({
		address: CONTRACTS.worldcoin[420].contract,
		abi: CONTRACTS.worldcoin[420].abi,
		functionName: 'estimateFees',
		args: ["0x00010000000000000000000000000000000000000000000000000000000000030d40", address],
	});

	useEffect(() => {

		if(isClaimed == "0n"){
			setClaimed(false)
		}else{
			setClaimed(true)
			
		}
	}, [isClaimed])
	
	const { config } = usePrepareContractWrite({
		address: CONTRACTS.worldcoin[420].contract,
		abi: CONTRACTS.worldcoin[420].abi,
		enabled: proof != null && address != null,
		functionName: 'MintHumanBadge',
		args: [
			address!,
			proof?.merkle_root ? decode<BigInt>('uint256', proof?.merkle_root ?? '') : BigInt(0),
			proof?.nullifier_hash ? decode<BigInt>('uint256', proof?.nullifier_hash ?? '') : BigInt(0),
			proof?.proof
				? decode<[BigInt, BigInt, BigInt, BigInt, BigInt, BigInt, BigInt, BigInt]>(
						'uint256[8]',
						proof?.proof ?? ''
				  )
				: [
						BigInt(0),
						BigInt(0),
						BigInt(0),
						BigInt(0),
						BigInt(0),
						BigInt(0),
						BigInt(0),
						BigInt(0),
				  ],
		],
		//@ts-ignore
		value: readFees?.nativeFee,
	})
	const { write } = useContractWrite(config)

	if(isLoading) return <div>Loading...</div>
	return (
		<main>
			{address ? (
				claimed ? (
				proof ? (
					<Button onClick={write}
                        className="hover:bg-purple-700"
                    >Claim Token</Button>
				) : (
					<IDKitWidget
						app_id="app_47ce5bdefaafbbecce98304424156ae9" // must be an app set to on-chain
						action="superattestations"
						signal={address}
						onSuccess={setProof}
					>
						{({ open }) => <Button onClick={open} >Verify</Button>}
					</IDKitWidget>
				)
			):(
				<div className="bg-green-500 p-4 rounded-md text-black text-sm">Worldcoin verified!</div>
			)) : null}
		</main>
	)
}
