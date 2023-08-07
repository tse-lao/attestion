"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Attestion, resolveColumns } from "./resolve-columns";
import { ResolveTable } from "./resolve-table";


export default function ResolveData({id, attestations}: {id: string, attestations: number}) {
  const [data, setData] = useState<Attestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      let unixTimestamp = Math.floor(Date.now() / 1000);
      let newTimestamp = unixTimestamp + 1000000;
      // Fetch data from your API here.
      
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
       
        setData(response.data.data.getSchema)
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
      
      setData([
        {
          id: "1",
          name: "John Doe",
          tags: "tag1, tag2, tag3",
          cid: "cid001",
          status: "attested",
          time: newTimestamp,
        },
        {
          id: "2",
          name: "Jane Smith",
          tags: "tag4, tag5, tag6",
          cid: "cid002",
          status: "revoked",
          time: newTimestamp
        },
        {
          id: "3",
          name: "Bob Johnson",
          tags: "tag7, tag8, tag9",
          cid: "cid003",
          status: "finished",
          time: newTimestamp +1000
        },
        {
          id: "4",
          name: "Alice Williams",
          tags: "tag10, tag11, tag12",
          cid: "cid004",
          status: "attested",
          time: newTimestamp -500
        },
        {
          id: "5",
          name: "Charlie Brown",
          tags: "tag13, tag14, tag15",
          cid: "cid005",
          "status": "revoked",
          time: newTimestamp -1000
        }
      ]
      );
      

    }

  }, []);

  return (
    <div className="container mx-auto py-10">
      {loading ? <div>Loading...</div> :       <ResolveTable columns={resolveColumns} data={data} />
}
    </div>
  );
}
