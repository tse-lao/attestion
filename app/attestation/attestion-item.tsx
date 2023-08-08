"use client";
import AccessType from "@/components/core/attestation/access-type";
import axios from "axios";
import {
  BookLockIcon,
  BookOpenCheckIcon,
  CheckIcon,
  CoinsIcon,
  GemIcon,
  MoreVerticalIcon,
  TimerIcon
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatEther } from 'viem';

export function AttestionAccess() {
  return (
    <div className="bg-gray-600 rounded-md p-4">
      <span>Attestion Access</span>
      <CheckIcon className="text-green-700" />
    </div>
  );
}

export default function AttestionItem({ schema}: {schema: any}) {
  const [data, setData] = useState<any>({})
  
  useEffect(() => {
    const getData = async () => {
        const baseURL = `https://optimism-goerli.easscan.org/graphql`;
        const response = await axios.post<any>(
          `${baseURL}/graphql`,
          {
            query:
              `query FindFirstSchema($where: SchemaWhereUniqueInput!) {
                getSchema(where: $where) {
                  _count {
                    attestations
                  }
                  creator
                  id
                  index
                  resolver
                  revocable
                  schema
                  txid
                  time
                }
              }`,
            variables: {
              where: {
                id: schema.schemaUID,
              },
            },
          },
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );
       
        setData(response.data.data.getSchema)
        //fix schema 
        console.log(response.data.data.getSchema)
      
    }
    if(schema){
      getData();
    }
  }, [schema])
  
  
  if(schema){
    return (
      <Link className="bg-gray-600 rounded-md p-4 flex flex-col gap-4 hover:outline hover:outline-green-300"  href={`/attestation/${schema.id}`}>
      <div className="flex justify-between pt-4 px-4">
          <div className="text-xl text-white hover:text-green-300" >{schema.name}</div>
          <MoreVerticalIcon className="text-gray-400 hover:text-gray-50 z-10 cursor-pointer" />
      </div>
      <div>
      <span className="text-gray-200 italic font-light text-sm m-4">
        {schema.description}
       </span>
    </div>
    <div className="grid md:grid-cols-2 gap-2">
      <AccessType type="Revoke Access" access={false} />
      <AccessType type="schema Access" access={true} />
    </div>
    
    <div className="grid grid-cols-3  m-4 items-center text-center">
      <IconItem icon={<TimerIcon />} value={schema.attestResolutionDays} />
      { schema.isMintable ? <IconItem icon={<BookOpenCheckIcon />} value="Open" /> : <IconItem icon={<BookLockIcon />} value="Close" />}
      { schema.isMintable ? <IconItem icon={<CoinsIcon />} value={formatEther(schema.mintPrice)} /> :  <IconItem icon={<GemIcon />} value={formatEther(schema.attestReward)} />}
     
    </div>

  
  </Link>
    )
  }
  
  return (
    <span>Something went wrong</span>
  )
}

export function IconItem({ icon, value }: { icon: any, value: any }) {
  
  return(
    <div className="flex flex-col gap-2 justify-center items-center">
        <div className="text-green-300">
        {icon}
        </div>  
        <span className="text-gray-200 font-medium tracking-wider text-sm">
          {value}
        </span>
      </div>

  )
  }  
        
