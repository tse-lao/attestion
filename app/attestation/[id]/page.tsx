"use client";
import AccessType from "@/components/core/attestation/access-type";
import SchemaList from "@/components/core/attestation/schema/schema-list";
import { Button } from "@/components/ui/button";
import { CONTRACTS } from "@/constants/contracts";
import { readContract } from "@wagmi/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Address, useAccount } from "wagmi";
import AttestionDetails from "./attestion-details";
export default function AttestationPage({
  params,
}: {
  params: { id: string };
}) {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const {address} = useAccount();

  useEffect(() => {
    const getData = async () => {
      const baseURL = `https://optimism-goerli.easscan.org/graphql`;
      const response = await axios.post<any>(
        `${baseURL}/graphql`,
        {
          query: `query FindFirstSchema($where: SchemaWhereUniqueInput!) {
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
              id: params.id,
            },
          },
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      setData(response.data.data.getSchema);
      //fix schema
      console.log(response.data.data.getSchema);
      await getAccess(response.data.data.getSchema.resolver);
      setLoading(false);
    };
    
    const getAccess = async (contract:Address) => {
      const data = await readContract({
        address: contract,
        abi: CONTRACTS.attestation.optimistic.abi,
        functionName: 'hasAccess',
        args: [address],
      }) as boolean
      
      console.log(data)
      setHasAccess(data)
    }

    if (params.id, address) {
      setLoading(true);
      getData();
    }
  }, [params, address]);

  if (loading) return <span>Loading..</span>;
  return (
    <main className="flex flex-col items-center text-left gap-8 m-12">
      <div className="max-w-2xl flex flex-col gap-4 items-center text-gray-300">
        <h1 className="text-left text-2xl tracking-wider font-light text-green-300">
          Name of the attestation
        </h1>
        <span className="text-sm text-left">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus porro
          tempore quod amet sunt architecto quas sit ratione unde reiciendis
          quaerat, ipsa vitae nemo earum, nam asperiores explicabo temporibus.
          Asperiores.
        </span>

        <div className="flex flex-col gap-4 w-full text-left mt-4">
          <h3 className="font-medium tracking-wider text-green-300">
            Schema Attributes
          </h3>

          <SchemaList list={data.schema} />
        </div>
      </div>
      <div className="flex gap-4">
        <AccessType type="Revoke Access" access={false} />
        <AccessType type="Attest Access" access={true} />
        <AccessType type="View Access" access={false} />
      </div>

      <div>
        {hasAccess ? (
           <AttestionDetails
           attestations={data._count?.attestations}
           id={params.id}
           schema={data.schema}
         />
          ): (
            <Button>Mint to view attestions 1 ETH</Button>
          )}
       
      </div>

     
    </main>
  );
}
