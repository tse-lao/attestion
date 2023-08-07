"use client";
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
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Address, usePublicClient } from "wagmi";

export type RevokerItem = {
  token: string;
  type: string;
  tokenId: string;
}
export default function CreateAttestion() {
  const [formData, setFormData] = useState({
    name: "DataPonte First Survey",
    description: "Lets try to see if we can make this work",
    attestRevokeBond: "1000000000000000000",
    attestRevokePeriod: "100",
    attestRevokePenalty: "1000000000000000000",
    resolutionDays: "100",
    attester: [] as RevokerItem[] ,
    revoker: [] as RevokerItem[],
    attesterToken: "0x000000",
    attestorTokenID: "0",
    attestReward: "1000000000000000000",
    isMintable: true,
    revokersToken: "0x000000",
    revokersTokenID: "0",
  });
  const publicClient = usePublicClient();

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);
    toast.success(formData.name + " created successfully");
  };

  const validateAddress = async (type:string) => {
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
        
        if(formData.attester == null) {
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
            ...formData.attester || [],
            {
              token: address,
              type: erc721 ? "ERC721" : "ERC1155",
              tokenId: "",
            },
          ],
        });
      }

      if (type == "revoker") {
        if(formData.revoker == null) {
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
          ...formData.revoker || [],
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
              <Select>
                <SelectTrigger className="w-full">
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
            <div key={index} className="grid grid-cols-6 w-full  items-center gap-1.5">
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
            <div key={index} className="grid grid-cols-6 w-full  items-center gap-1.5">
              <div className="grid col-span-2">
                <Label htmlFor="address" className="text-green-300">{revoker.type}</Label>
                <span className="overflow-auto text-xs">
                  {revoker.token}
                </span>
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
            <Button
              className="w-full bg-green-300 text-gray-900 hover:text-green-300"
              onClick={handleSubmit}
            >
              Create Attestion
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
