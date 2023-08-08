"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEthersSigner } from "@/lib/ethers";
import { getLighthouseKeys } from "@/lib/lighthouse";

import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";

export type SchemaInput = {
  name: string;
  value: any;
  type: string;
};
export default function SchemaForm({
  list,
  schemaUID,
}: {
  list: string;
  schemaUID: string;
}) {
  const [schema, setSchema] = useState<SchemaInput[]>([]);
  const [formData, setFormData] = useState<any>({});
  const signer = useEthersSigner();
  const {address} = useAccount();

  useEffect(() => {
    console.log(list);

    if (list) {
      list.split(",").map((listItem: string, index) => {
          if (index > 0) {
            const [empty, type, name] = listItem.split(" ");
            setSchema((prev) => [
              ...prev,
              { name: name, type: type, value: null },
            ]);
          } else {
            const [type, name] = listItem.split(" ");
            setSchema((prev) => [
              ...prev,
              { name: name, type: type, value: null },
            ]);
          }
      });
    }
  }, [list]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setSchema((prev: any) =>
      prev.map((item: any) => (item.name === name ? { ...item, value } : item))
    );
  };

  const handleFileChange = async(e: any) => {
    //need to upload file to lighthouse and make sure that we get back the hash.
    if (!address) {
      toast.error("no valid address");

      return;
    }
    const { JWT, apiKey } = await getLighthouseKeys(address);

    if (!apiKey) {
      toast.error("no valid apiKey");
      return;
    }
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    console.log(file);
    formData.append("address", address);
    formData.append("apiKey", apiKey);

    const config = {
      headers: {
        Authorization: `${JWT}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const url = process.env.NEXT_PUBLIC_API || "http://localhost:4000";
      const response = await axios.post(
        `${url}/files/uploadFile`,
        formData,
        config
      );
      
      toast.success("File uploaded successfully");
      const hash = response.data.Hash;
      setSchema((prev: any) =>
        prev.map((item: any) =>
          item.name === name ? { ...item, hash } : item
        )
      );
    } catch (err) {
      toast.error("Something went wrong when uploading the file");
      throw err;
    }
  };

  const submitData = async () => {
    console.log(schema);
    const EASoGoerli = "0x1a5650d0ecbca349dd84bafa85790e3e6955eb84";
    const eas = new EAS(EASoGoerli);
    //const signer = walletClientToSigner(walletCline);
    if (!signer) {
      //@ts-ignore
      eas.connect(signer);
    }
    //ts-ignore error

    const schemaEncoder = new SchemaEncoder(list);
    //check if there is a type of uint256 and convert value to number
    console.log(schema);
    const encodedData = schemaEncoder.encodeData(schema);

    const tx = await eas.attest({
      schema: schemaUID,
      data: {
        recipient: "0x0000000000000000000000000000000000000000",

        revocable: true,
        data: encodedData,
      },
    });

    const newAttestationUID = await tx.wait();

    console.log("New attestation UID:", newAttestationUID);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {schema.map(
        (item, index) =>
          (item.type === "string" && (
            <div key={index}>
              <Label>{item.name}</Label>
              <Input
                name={item.name}
                type="text"
                required
                onChange={handleChange}
                className="block w-full p-2 border rounded-md"
              />
            </div>
          )) ||
          (item.type === "uint256" && (
            <div key={index}>
              <Label>{item.name}</Label>
              <Input
                name={item.name}
                type="number"
                onChange={handleChange}
                required
                className="block w-full p-2 border rounded-md"
              />
            </div>
          )) ||
          (item.type === "bytes32" && (
            <div key={index}>
              <Label>{item.name}</Label>
              <Input
                name={item.name}
                type="file"
                onChange={handleFileChange}
                required
                className="block w-full p-2 border rounded-md"
              />
            </div>
          ))
      )}

      <Button onClick={submitData}>Submit data</Button>
    </div>
  );
}
