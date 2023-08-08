"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SchemaForm from "@/components/core/attestation/schema/schema-form";
import { CONTRACTS } from "@/constants/contracts";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useContractWrite } from "wagmi";
import AttestionData from "./attestion-table/attestion-data";
import ResolveData from "./resolve-table/resolve-data";

export default function AttestionDetails({
  attestations,
  id,
  schema,
  hasAccess
}: {
  attestations: any;
  id: string;
  schema: any;
  hasAccess: any;
}) {
  
  const { data:resolveData, isLoading:resolveLoading, isSuccess:resolveSuccess, write:resolve } = useContractWrite({
    address: CONTRACTS.attestation.optimistic.contract,
    abi: CONTRACTS.attestation.optimistic.abi,
    functionName: 'resolveAttestations',
  })
  const { data:splitData, isLoading:splitLoading, isSuccess:splitSuccess, write:splitFunds } = useContractWrite({
    address: CONTRACTS.attestation.optimistic.contract,
    abi: CONTRACTS.attestation.optimistic.abi,
    functionName: 'splitMintingFunds',
  })
  

  return (
    <Tabs defaultValue="attest" className="w-full flex flex-col items-center">
      <TabsList className="grid max-w-2xl grid-cols-3 mb-4">
        <TabsTrigger value="attest">Attest</TabsTrigger>
        <TabsTrigger value="view">View Attestations</TabsTrigger>
        <TabsTrigger value="revoke">Revoke</TabsTrigger>
      </TabsList>
      <TabsContent value="attest">
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-300 tracking-wider font-light">
              Create Attestation
            </CardTitle>
            <CardDescription className="text-white">
              Attestion bond: 1.0 ETH
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <SchemaForm list={schema} schemaUID={id} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="view" className="w-full">
      {hasAccess.attest ? (
              <AttestionData />
              ): (
                <div>No access </div>
              )}
        
      </TabsContent>
      <TabsContent value="revoke" className="w-full">
        {hasAccess.revoke ? (
          <div>
            <ResolveData id={id} attestations={attestations}/>
           <div className="grid grid-cols-2 gap-8">
             <Button onClick={() => {resolve()}} disabled={resolveLoading}>
              {resolveLoading ? <><ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Resolving...</> : 'Resolve Attestations'}
              
            </Button>
             <Button onClick={() => {splitFunds()}} disabled={splitLoading}>
             {splitLoading ? <><ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Splitting...</> : 'Splitting Funds'}

            </Button>
           </div>
           </div>
        ): (
          <span>No access </span>
        )}
       
      </TabsContent>
    </Tabs>
  );
}
