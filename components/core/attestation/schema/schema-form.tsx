"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEthersSigner } from "@/lib/ethers";
import { getLighthouseKeys } from "@/lib/lighthouse";

import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { useState } from "react";
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
  const [formData, setFormData] = useState<any>({
    name: "", 
    file: "", 
    description: "",
    
  });
  const signer = useEthersSigner();
  const {address} = useAccount();
  

/*   useEffect(() => {
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
 */
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
      const url = process.env.NEXT_PUBLIC_API || "https://api.dataponte.com";
      const response = await axios.post(
        `${url}/files/uploadFile`,
        formData,
        config
      );
      
      toast.success("File uploaded successfully");
      const hash = response.data.Hash;
      setFormData((prev: any) => ({ ...prev, file: hash }));
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
      <div>
              <Label>Name</Label>
              <Input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required={true}
            />
            </div>
            <div>
              <Label>Upload Data</Label>
              <Input
              name="name"
              type="file"
              value={formData.name}
              onChange={handleFileChange}
              placeholder="Name"
              required={true}
            />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                name="name"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                placeholder="Name"

              />
            </div>
      <Button onClick={submitData}>Submit data</Button>
    </div>
  );
}
