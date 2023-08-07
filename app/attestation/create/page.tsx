"use client";
import SchemaList from "@/components/core/attestation/schema/schema-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CONTRACTS } from "@/constants/contracts";
import { ReloadIcon } from "@radix-ui/react-icons";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Address, useContractWrite, usePublicClient } from "wagmi";
export type RevokerItem = {
  token: string;
  type: string;
  tokenId: string;
};
export type SchemaInput = {
  name: string;
  type: string;
  isArray: string;
};
export default function CreateAttestion() {
  const [formData, setFormData] = useState({
    name: "DataPonte First Survey",
    description: "Lets try to see if we can make this work",
    attestRevokeBond: "1000000000000000000",
    attestRevokePeriod: "100",
    attestRevokePenalty: "1000000000000000000",
    resolutionDays: "100",
    mintPrice: 0,
    schemaInput: {
      name: "",
      type: "string",
      isArray: "false",
    } as SchemaInput,
    schema: "",
    attester: [] as RevokerItem[],
    revoker: [] as RevokerItem[],
    attesterToken: "0x000000",
    attestorTokenID: "0",
    attestReward: 1,
    isMintable: false,
    revokersToken: "0x000000",
    revokersTokenID: "0",
  });
  const publicClient = usePublicClient();

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: CONTRACTS.attestionFactory.optimistic.contract,
    abi: CONTRACTS.attestionFactory.optimistic.abi,
    functionName: "createSuperSchema",
  });

  const addSchemaInput = () => {
    if (formData.schemaInput.name == "" || formData.schemaInput.type == "") {
      toast.error("Please fill out the name and type");
      return;
    }

    let newSchema = "";
    if (formData.schema.length < 1) {
      if (formData.schemaInput.isArray == "true") {
        newSchema += `${formData.schemaInput.type}[] ${formData.schemaInput.name}`;
        return;
      }

      newSchema += `${formData.schemaInput.type} ${formData.schemaInput.name}`;
    } else {
      if (formData.schemaInput.isArray == "true") {
        newSchema += `,${formData.schemaInput.type}[] ${formData.schemaInput.name}`;
        return;
      }
      newSchema += `,${formData.schemaInput.type} ${formData.schemaInput.name}`;
    }

    console.log(newSchema);
    setFormData({
      ...formData,
      schema: newSchema,
      schemaInput: {
        name: "",
        type: "string",
        isArray: "false",
      },
    });
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSchemaChange = (e: any) => {
    setFormData({
      ...formData,
      schemaInput: {
        ...formData.schemaInput,
        [e.target.name]: e.target.value,
      },
    });
  };
  const handleTypeChange = (e: any, type: string) => {
    if (type == "isArray") {
      setFormData({
        ...formData,
        schemaInput: {
          ...formData.schemaInput,
          isArray: e,
        },
      });
      return;
    }
    setFormData({
      ...formData,
      schemaInput: {
        ...formData.schemaInput,
        type: e,
      },
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);

    //[attestionDays, schema, mintPrice, attestReward, mitnable]
    let params = [
      formData.name,
      formData.description,
      formData.resolutionDays,
      formData.schema,
      formData.mintPrice,
      formData.attestReward,
      formData.isMintable,
    ];
    const tokenGateAddresses = [
      "0x0000000000000000000000000000000000000000",
      "0x0000000000000000000000000000000000000000",
    ];
    const tokenGateEnum = [0, 0];

    const tokenGateTokenID = [0, 0];
    write({
      args: [tokenGateAddresses, tokenGateEnum, tokenGateTokenID, params],
    });

    if (data) {
      console.log(data);
      toast.success("Success");
    }
  };

  const changeMintable = (e: any) => {
    
    if(e == "true"){
      setFormData({
        ...formData,
        isMintable: true,
        attestReward: 0,
      });
      return; 
    }else{
      setFormData({
        ...formData,
        isMintable: false,
        mintPrice: 0,
      });
      return;
    }
  };

  const validateAddress = async (type: string) => {
    let address = formData.attesterToken as Address;
    const wagmiAbi = [
      {
        constant: true,
        inputs: [{ name: "interfaceId", type: "bytes4" }],
        name: "supportsInterface",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "pure",
        type: "function",
      },
    ];

    const erc721 = await publicClient.readContract({
      address: address,
      abi: wagmiAbi,
      functionName: "supportsInterface",
      args: ["0x80ac58cd"],
    });
    const erc1155 = await publicClient.readContract({
      address: address,
      abi: wagmiAbi,
      functionName: "supportsInterface",
      args: ["0xd9b67a26"],
    });

    if (erc721 || erc1155) {
      toast.success("ERC721 token found");
      if (type == "attester") {
        if (formData.attester == null) {
          setFormData({
            ...formData,
            attester: [
              {
                token: address,
                type: erc721 ? "ERC721" : "ERC1155",
                tokenId: "",
              },
            ],
          });
        }
        setFormData({
          ...formData,
          attester: [
            ...(formData.attester || []),
            {
              token: address,
              type: erc721 ? "ERC721" : "ERC1155",
              tokenId: "",
            },
          ],
        });
      }

      if (type == "revoker") {
        if (formData.revoker == null) {
          setFormData({
            ...formData,
            revoker: [
              {
                token: address,
                type: erc721 ? "ERC721" : "ERC1155",
                tokenId: "",
              },
            ],
          });
        }
        setFormData({
          ...formData,
          revoker: [
            ...(formData.revoker || []),
            {
              token: address,
              type: erc721 ? "ERC721" : "ERC1155",
              tokenId: "",
            },
          ],
        });
      }
    }
  };
  return (
    <main>
      <div className=" p-8 m-12 rounded-md flex flex-col justify-center items-center">
        <h1 className="text-center text-2xl mb-4 text-green-300">
          Create Optimistic Attestation
        </h1>
        <div className="flex flex-col gap-8 bg-gray-600 rounded-md p-12 w-full max-w-2xl">
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="picture">Name</Label>
            <Input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required={true}
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              required={true}
            />
          </div>
          <div className="grid w-full grid-cols-6 items-center gap-2">
            <Input
              name="name"
              type="text"
              value={formData.schemaInput.name}
              onChange={handleSchemaChange}
              placeholder="Enter name"
              required={true}
              className="col-span-2"
            />
            <Select
              name="type"
              defaultValue={formData.schemaInput.type}
              onValueChange={(e) => handleTypeChange(e, "type")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select inputtype" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select your input type</SelectLabel>
                  <SelectItem value="string">String</SelectItem>
                  <SelectItem value="uint256">Number</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Select
                name="isArray"
                defaultValue={formData.schemaInput.isArray.toString()}
                onValueChange={(e) => handleTypeChange(e, "isArray")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select inputtype" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={"false"}>Single</SelectItem>
                    <SelectItem value={"true"}>Array</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-green-300" onClick={addSchemaInput}>
              <PlusIcon className="h-5 w-5" />
            </Button>
          </div>
          <SchemaList list={formData.schema} />
          <div className="grid grid-cols-2 w-full items-center gap-1.5">
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="attestRevokeBond">Attestion Revoke bond</Label>
              <div className="flex w-full items-center space-x-2">
                <Input
                  name="attestRevokeBond"
                  type="text"
                  value={formData.attestRevokeBond}
                  onChange={handleChange}
                  placeholder="Enter bond"
                  required={true}
                />
              </div>
            </div>
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="resultionDays">Resolution Days</Label>
              <Input
                name="resolutionDays"
                type="number"
                value={formData.resolutionDays}
                onChange={handleChange}
                placeholder="Enter resolution days in seconds"
                required={true}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 w-full  items-center gap-1.5">
            <div className="col-span-1">
              <Label htmlFor="picture">Mintable</Label>
              <Select
                defaultValue={formData.isMintable.toString()}
                onValueChange={(e) => changeMintable(e)}
              >
                <SelectTrigger
                  className="w-full"
                  name="isMintable"
                  value={formData.isMintable.toString()}
                  onChange={handleChange}
                >
                  <SelectValue placeholder="Mintable" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Is it mintable</SelectLabel>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {formData.isMintable ? (
              <div>
                <Label htmlFor="mintPrice">Mint price</Label>
                <Input
                  name="mintPrice"
                  type="number"
                  value={formData.mintPrice}
                  onChange={handleChange}
                  placeholder="Enter mint price"
                  required={true}
                />
              </div>
            ) : (
              <div>
                <Label htmlFor="attestReward">Attest Reward</Label>
                <Input
                  name="attestReward"
                  type="number"
                  value={formData.attestReward}
                  onChange={handleChange}
                  placeholder="Enter attestation reward"
                  required={true}
                />
              </div>
            )}
          </div>

          <div className="grid w-full  items-center gap-2">
            <Label htmlFor="attestorToken">Attesters Token</Label>
            <div className="flex w-full items-center space-x-2">
              <Input
                name="attesterToken"
                type="text"
                value={formData.attesterToken}
                onChange={handleChange}
                placeholder="Add attestation token address (ERC721 or ERC1155)"
                required={true}
              />
              <Button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  validateAddress("attester");
                }}
              >
                <PlusIcon />
              </Button>
            </div>
          </div>
          {formData.attester?.map((attester, index) => (
            <div
              key={index}
              className="grid grid-cols-6 w-full  items-center gap-1.5"
            >
              <div className="grid col-span-2">
                <Label htmlFor="address">Token address</Label>
                <span className="overflow-auto text-xs">
                  {attester.token} - {attester.type}
                </span>
              </div>
              <div className="col-span-3 overflow-auto w-full">
                <Label htmlFor="revokerTokenID">Token IDs</Label>
                <Input
                  name="revokersTokenID"
                  type="number"
                  value={formData.attester[index].tokenId}
                  onChange={handleChange}
                  placeholder="Required for ERC1155"
                  required={true}
                />
              </div>
              <div className="col-span-1 flex items-end">
                <Button className="bg-red-300">
                  <MinusIcon />
                </Button>
              </div>
            </div>
          ))}
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="revokersToken">Revokers Address</Label>
            <div className="flex w-full items-center space-x-2">
              <Input
                name="revokersToken"
                type="text"
                value={formData.revokersToken}
                onChange={handleChange}
                placeholder="Enter Revokers token address (ERC721 or ERC1155)"
                required={true}
              />
              <Button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  validateAddress("revoker");
                }}
              >
                <PlusIcon />
              </Button>
            </div>
          </div>
          {formData.revoker?.map((revoker, index) => (
            <div
              key={index}
              className="grid grid-cols-6 w-full  items-center gap-1.5"
            >
              <div className="grid col-span-2">
                <Label htmlFor="address" className="text-green-300">
                  {revoker.type}
                </Label>
                <span className="overflow-auto text-xs">{revoker.token}</span>
              </div>
              <div className="col-span-3 overflow-auto w-full">
                <Label htmlFor="revokerTokenID">Token IDs</Label>
                <Input
                  name="revokersTokenID"
                  type="number"
                  value={formData.revoker[index].tokenId}
                  onChange={handleChange}
                  placeholder="Required for ERC1155"
                  required={true}
                />
              </div>
              <div className="col-span-1 flex items-end">
                <Button className="bg-red-300">
                  <MinusIcon />
                </Button>
              </div>
            </div>
          ))}

          <div className="w-full">
            {isLoading ? (
              <Button
                className="w-full bg-green-300 text-gray-900 hover:text-green-300"
                onClick={handleSubmit}
              >
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              </Button>
            ) : (
              <Button
                className="w-full bg-green-300 text-gray-900 hover:text-green-300"
                onClick={handleSubmit}
              >
                <PlusIcon className="mr-2 h-4 w-4" />{" "}
                <span> Create Attestion</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
