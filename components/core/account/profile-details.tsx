

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAccount, useDisconnect } from 'wagmi';

import { Address, createPublicClient, formatEther, http } from 'viem';
import { filecoinCalibration, polygonMumbai } from "wagmi/chains";


import { CopyIcon, Download, LogOutIcon, PlusIcon, RecycleIcon, SettingsIcon, Wallet2Icon } from 'lucide-react';
import ModalLayout from './modal-layout';
import ProfileBalance from './profile-balance';



export default function ProfileDetails({ showModal, open, setShowModal }: any) {

    const { disconnect } = useDisconnect();
    const [maticBalance, setMaticBalance] = useState("");
    const [fileBalance, setFileBalance] = useState("0");
    const [loading, setLoading] = useState(true);


    const { address: account, isConnected } =
        useAccount();


    useEffect(() => {
        async function getBalances() {
            const client = createPublicClient({
                chain: polygonMumbai,
                transport: http('https://rpc-mumbai.maticvigil.com')
            });
            const filecoinClient = createPublicClient({
                chain: filecoinCalibration,
                transport: http('https://filecoin-calibration.chainup.net/rpc/v1')
            });
        
            const getMaticBalance: bigint = await client.getBalance({
                address:account as Address
            })
        
            const formatBalance: string = formatEther(getMaticBalance);
            setMaticBalance(formatBalance);
        
            const filecoinBalance = await filecoinClient.getBalance({
                address: account as Address
            })
        
            const formatBalanceFilecoin: string = formatEther(filecoinBalance);
            setFileBalance(formatBalanceFilecoin);
        
        
        }
    
        getBalances();
        
        setLoading(false)

}, [account]);




    



async function copyAddress() {
    navigator.clipboard.writeText(account as Address)
    toast.success("Copied to clipboard")
}

return (
    <ModalLayout title="" showModal={showModal}>
        {isConnected ? (

            <div className='flex flex-col divide-solid'>
                <div id="username" className='text-lg'>
                    <h1>Portfolio</h1>
                    <span
                        className="text-lg font-bold ml-4"
                    >
                        $ 0.00
                    </span>
                    <div className='grid grid-cols-4 gap-2 my-4 text-gray-900'>
                        <div className='rounded-md bg-green-200 flex justify-center py-4 hover:shadow-sm hover:bg-green-400'>
                            <PlusIcon />
                        </div>
                        <div className='rounded-md bg-green-200 flex justify-center py-4 hover:bg-green-400'>
                            <Download />
                        </div>
                        <div className='rounded-md bg-green-200 flex justify-center py-4 hover:bg-green-400'>
                            <RecycleIcon />
                        </div>
                        <div className='rounded-md bg-green-200 flex justify-center py-4 hover:bg-green-400'>
                            <Wallet2Icon />
                        </div>
                        
                    </div>
                </div>
                <div id="balances" className='grid grid-cols-1 py-4 gap-4'>

                    <ProfileBalance loading={loading} token="filecoin" balance={fileBalance} />
                    <ProfileBalance loading={loading} token="matic" balance={maticBalance} />

                </div>
                <div className="grid grid-cols-3 p-4 gap-2">
                     <button className='font-bold flex justify-center  px-3 rounded-md py-4 text-center hover:bg-gray-400'
                        onClick={() => copyAddress()}
                    >
                        <CopyIcon />
                    </button>
                    <Link
                        href="/profile/settings"
                        className=' font-bold flex justify-center  px-3 rounded-md py-4 text-center hover:bg-gray-400'
                    >
                        <SettingsIcon />
                    </Link>
                    <button
                        className='text-red-500 flex justify-center  py-4 font-bold hover:bg-red-200   px-3 rounded-md'
                        onClick={() => { disconnect(); setShowModal(false) }}
                    >
                        <LogOutIcon />
                    </button>



                </div>
            </div>


        ) : (
            <p>Not connected</p>
        )}
    </ModalLayout>
)
}