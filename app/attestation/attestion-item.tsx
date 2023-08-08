"use client";
import AccessType from "@/components/core/attestation/access-type";
import SchemaList from "@/components/core/attestation/schema/schema-list";
import axios from "axios";
import {
  CheckIcon,
  MoreVerticalIcon
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function AttestionAccess() {
  return (
    <div className="bg-gray-600 rounded-md p-4">
      <span>Attestion Access</span>
      <CheckIcon className="text-green-700" />
    </div>
  );
}

export default function AttestionItem({ attestation}: {attestation?: any}) {
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
                id: attestation.schemaUID,
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
    if(attestation){
      getData();
    }
  }, [attestation])
  
  
  if(attestation){
    return (
      <div className="bg-gray-600 rounded-md p-4 flex flex-col gap-4 hover:outline hover:outline-green-300" >
      <div className="flex justify-between pt-4 px-4">
          <Link className="text-xl text-white hover:text-green-300" href={`/attestation/${attestation.id}`} >{attestation.name}</Link>
          <MoreVerticalIcon className="text-gray-400 hover:text-gray-50 z-10 cursor-pointer" />
      </div>
      <div>
      <span className="text-gray-200 italic font-light text-sm m-4">
        {attestation.description}
       </span>
    </div>
    <div className="flex flex-col gap-2">
      <AccessType type="Revoke Access" access={false} />
      <AccessType type="Attestation Access" access={true} />
    </div>
    <div>
      <h3 className="text-green-300">Schema properties</h3>
      <SchemaList list={data.schema} />
    </div> 
    
    <div className="grid grid-cols-4">
      <div>
        {data.attestResolutionDays}
      </div>
      <div>
        {data.isMintable}
      </div>
      <div>
        {data.mintPrice}
      </div>
      <div>
        {data.attestReward}
      </div>
    </div>

  
  </div>
    )
  }
  
  return (
    <span>Something went wrong</span>
  )
}
