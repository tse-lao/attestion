"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEthersSigner } from "@/lib/ethers";
import { getLighthouseKeys } from "@/lib/lighthouse";

import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { List } from "lucide-react";
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
    name: "Test Attestation", 
    file: "QmUCfJPFi5oCGruzVQQyt9zB2bjBkfckjB53LNJ5Qpzv5b", 
    description: "This is incorrect and needs to be revoked if posisble",
    
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = async(e: any) => {
    //need to upload file to lighthouse and make sure that we get back the hash.
    console.log(e)
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
      const url = "https://api.dataponte.com";
      const response = await axios.post(
        `${url}/files/uploadFile`,
        formData,
        config
      );
      
      console.log(response)
      toast.success("File uploaded successfully");
      const hash = response.data.data[0].Hash;
      console.log(hash)
      setFormData((prev: any) => ({ ...prev, file: hash }));
    } catch (err) {
      toast.error("Something went wrong when uploading the file");
      throw err;
    }
  };

  const submitData = async () => {

    const EASoGoerli = "0x1a5650d0ecbca349dd84bafa85790e3e6955eb84";
    const eas = new EAS(EASoGoerli);
    //const signer = walletClientToSigner(walletCline);

      //@ts-ignore
      eas.connect(signer);

    //ts-ignore error
    console.log(List)
    const schemaEncoder = new SchemaEncoder("string name, string file, string description");
    //check if there is a type of uint256 and convert value to number
    console.log(schema);
    
    // its not a schema so we can put in our won. 
    const encodedData = schemaEncoder.encodeData([
      { name: "name", value: formData.name, type: "string" },
      { name: "file", value: formData.file, type: "string" },
      { name: "description", value: formData.description, type: "string" },
    ]);
    
    console.log(schemaUID)

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
              type="file"
              id="image"
              name="image"
              multiple
              accept="*"
              onChange={(e) => handleFileChange(e)}
              className="rounded bg-none  text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formData.file && <span>{formData.file}</span>}

            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                name="description"
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
