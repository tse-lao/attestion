"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SchemaForm from "@/components/core/attestation/schema/schema-form";
import Loading from "@/components/core/loading/loading";
import axios from "axios";
import { useEffect, useState } from "react";
import AttestionData from "./attestion-table/attestion-data";
import ResolveData from "./resolve-table/resolve-data";

export type Attestion = {
  attester: string;
  data:string
  decodedDataJson:string;
  expirationTime:string;
  ipfsHash:string;
  id:string;
  isOffchain:boolean;
  recipient:string;
  refUID:string;
  revocable:true
  revocationTime:number;
  revoked:string;
  schemaId:string;
  time:number;
  timeCreated:number;
  txid:string;
};

export default function AttestionDetails({
  attestations,
  id,
  schema,
  hasAccess,
  resolutionDays,
  details
}: {
  attestations: any;
  id: string;
  schema: string;
  hasAccess: any;
  resolutionDays: number;
  details:any;
}) {


  const [data, setData] = useState<Attestion[]>([]);
  const [listAttest, setListAttest] = useState<Attestion[]>([]);
  const [listRevoker, setListRevoker] = useState<Attestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      
      
      const baseURL = `https://optimism-goerli-bedrock.easscan.org/graphql`;
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

      let attestationsList = response.data.data.getSchema.attestations;
      
      
      //i want to get all the revoker that are not revoked and that are not expired
      let revokersList = response.data.data.getSchema.attestations;
      const newTimestamp = new Date().getTime();
      
      //get all attestations that are not expired
      revokersList = revokersList.filter((attestation: { timeCreated: number; }) => 
          attestation.timeCreated + resolutionDays >= newTimestamp
      );
      revokersList = revokersList.filter((attestation: { revoked: boolean; }) =>
        attestation.revoked 
      );
      
      setListRevoker(revokersList);
      setListAttest(attestationsList);
      setData(response.data.data.getSchema.attestations);

      //fix schema
      console.log(response.data.data.getSchema);
      setLoading(false);
    };

    if (id) {
      if (attestations < 1) {
        setLoading(false);
        return;
      }
      getData();
    }
  }, [attestations, id, resolutionDays]);

  if(loading) return <Loading />;
  return (
    <Tabs defaultValue="attest" className="w-full flex flex-col items-center">
      <TabsList className="grid max-w-2xl grid-cols-3 mb-4">
        <TabsTrigger value="attest" disabled={!hasAccess.attest}>Attest</TabsTrigger>
        <TabsTrigger value="view" disabled={!hasAccess.fileAccess}>View Attestations</TabsTrigger>
        <TabsTrigger value="revoke" disabled={!hasAccess.revoke}>Revoke</TabsTrigger>
      </TabsList>
      <TabsContent value="attest" className="min-w-[300px]">
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-300 tracking-wider font-light">
              Create Attestation
            </CardTitle>
            <CardDescription className="text-green-300">
              Reward {details.attestReward} ETH
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <SchemaForm schema={schema} schemaUID={id} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="view" className="w-full">
        {hasAccess.attest ? <AttestionData id={id} attestations={listAttest}/> : <div> No access </div>}
      </TabsContent>
      <TabsContent value="revoke" className="w-full">
        {hasAccess.revoke ? (
          <div>
            <ResolveData id={id} attestations={attestations} />
         
          </div>
        ) : (
          <span>No access </span>
        )}
      </TabsContent>
    </Tabs>
  );
}
