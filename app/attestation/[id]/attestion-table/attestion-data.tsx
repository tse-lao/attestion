"use client";
import Loading from "@/components/core/loading/loading";
import axios from "axios";
import { useEffect, useState } from "react";
import { Attestion, AttestionColumns } from "./columns";
import { AttestionDataTable } from "./data-table";


export default function AttestionData({id, attestations}: {id: string, attestations: number}) {
  const [data, setData] = useState<Attestion[]>([]);
  const [loading, setLoading] = useState(true);

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
                  attestations {
                    attester
                    data
                    decodedDataJson
                    expirationTime
                    ipfsHash
                    id
                    isOffchain
                    recipient
                    refUID
                    revocable
                    revocationTime
                    revoked
                    schemaId
                    time
                    timeCreated
                    txid
                  }
                }
              }`,
            variables: {
              where: {
                id: id,
              },
            },
          },
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );
       
        

        let attestationsList =  response.data.data.getSchema.attestations;
        const newTimestamp = new Date().getTime();
        const resolutionTime = 1000 * 60 * 60 * 24 * 30;
        for(let i = 0; i < attestationsList.length; i++){
          if(attestationsList.timeCreated + resolutionTime < newTimestamp){
            attestationsList.splice(i, 1)
          }
        
        }
        setData(response.data.data.getSchema.attestations)
        
        //fix schema 
        console.log(response.data.data.getSchema)
        setLoading(false)
      
    }
    
    if(id){
      if(attestations < 1){
        setLoading(false)
        return;
      }
      getData()
    }


  }, [attestations, id]);

  return (
    <div className="container mx-auto py-10">
      {loading ? <Loading /> :       <AttestionDataTable columns={AttestionColumns} data={data} />
}
    </div>
  );
}
