"use client";
import AccessType from "@/components/core/attestation/access-type";
import SchemaList from "@/components/core/attestation/schema/schema-list";
import Loading from "@/components/core/loading/loading";
import { Button } from "@/components/ui/button";
import { CONTRACTS } from "@/constants/contracts";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { readContract } from "@wagmi/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAccount, useContractWrite } from "wagmi";
import AttestionDetails from "./attestion-details";
export default function AttestationPage({
  params,
}: {
  params: { id: string };
}) {
  const [data, setData] = useState<any>({});
  const [details, setDetails]= useState<any>({
    mintPrice: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [hasAccess, setHasAccess] = useState<any>({
    revoke: true, 
    attest: true, 
    fileAccess: true
  });
  const {address} = useAccount();
  const {
  isLoading: minting,
  write: mint,
} = useContractWrite({
  address: CONTRACTS.attestionFactory[420].contract,
  abi: CONTRACTS.attestionFactory[420].abi,
  functionName: "mint",
  args: [details.mintPrice, details.schemaUID],
  
});


  useEffect(() => {
    const getDetails = async () => {
      const APIURL = "https://api.studio.thegraph.com/query/49385/attestations/version/latest";
        const tokensQuery = gql`
        query SchemaByUID($id: String!) {
            schemaRegistered(id: $id){
                id
                name
                description
                isMintable
                mintPrice
                attestResolutionDays
                schemaUID
                transactionHash
                resolver
                attestReward
            }
        }`;

        const client = new ApolloClient({
            uri: APIURL,
            cache: new InMemoryCache(),
        });
        
        client.query({
            query: tokensQuery,
            variables: { id: params.id } // Replace 'YOUR_SCHEMA_UID_VALUE' with your actual value
        })
        .then(data => {
            console.log("Subgraph data: ", data);
            setDetails(data.data.schemaRegistered);
            getData(data.data.schemaRegistered.schemaUID)
        })
        .catch(err => {
            console.log("Error fetching data: ", err);
        })

    }
    const getData = async (schemaUID:string) => {
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
              id: schemaUID,
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
      await getAccess(schemaUID);
      
      setLoading(false);
      
    };
    
    //get data from own GRAPH. 
    
    const getAccess = async (schemaUID:string) => {
      const fileAccess = await readContract({
        address: CONTRACTS.attestionFactory[420].contract,
        abi: CONTRACTS.attestionFactory[420].abi,
        functionName: 'hasAccess',
        args: [schemaUID, address],
      }) as boolean
      
      console.log(fileAccess)
      const revokeAccess = await readContract({
        address: CONTRACTS.attestionFactory[420].contract,
        abi: CONTRACTS.attestionFactory[420].abi,
        functionName: 'hasRevokeAccess',
        args: [schemaUID, address],
      }) as boolean
      
      
      
      /* const attestAccess = await readContract({
        address: CONTRACTS.attestionFactory.optimistic.contract,
        abi: CONTRACTS.attestionFactory.optimistic.abi,
        functionName: 'hasAttestAccess',
        args: [params.id, address],
      }) as boolean
       */

      setHasAccess({
        revoke: revokeAccess,
        attest: true,
        fileAccess: fileAccess
      })
        
      console.log(revokeAccess, true, fileAccess)
    }

    if (params.id, address) {
      setLoading(true);
      getDetails();
    }
  }, [params, address]);

  if (loading) return <Loading />;
  return (
    <main className="flex flex-col items-center text-left gap-8 m-12">
      <div className="max-w-2xl flex flex-col gap-4 items-center text-gray-300">
        <h1 className="text-left text-2xl tracking-wider font-light text-green-300">
          {details.name}
        </h1>
        <span className="text-sm text-left">
          {details.description}
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
        
        {hasAccess.fileAccess ? (
           <Button>Already have file access</Button>
          ): details.isMintable ?(
            <Button onClick={() => mint()} disabled={minting}>
              {minting ? <><ReloadIcon /> Minting..</> : "Mint to view attestions"}
              Mint to view attestions {details.mintPrice} ETH
            </Button>
          ): (
            <Button disabled>Private DataPool</Button>
          )}
       
      </div>
      
      <AttestionDetails
           attestations={data._count?.attestations}
           id={data.id}
           schema={data.schema}
           hasAccess={hasAccess}
            details={details} 
         />

     
    </main>
  );
}
