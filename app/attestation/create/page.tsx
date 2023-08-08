"use client";
import CustomAddress from "@/components/core/attestation/customAddress";
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
import { PlusIcon } from "lucide-react";
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
    schema: "name string, file string, description string",
    attesterToken: "0x0000000000000000000000000000000000000000",
    attesterTokenID: 0,
    attesterStatus: 0,
    attestReward: 1,
    isMintable: false,
    revokerToken: "0x0000000000000000000000000000000000000000",
    revokerTokenID: 0,
    revokerStatus: 0,
  });
  
  const [customRevokers, setCustomRevokers] = useState<string[]>([]);
  const [customAttesters, setCustomAttesters] = useState<string[]>([]);
  const [showAModal, setShowAModal] = useState(false);
  const [showRModal, setShowRModal] = useState(false);
  const publicClient = usePublicClient();

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: CONTRACTS.attestionFactory.optimistic.contract,
    abi: CONTRACTS.attestionFactory.optimistic.abi,
    functionName: "createSuperSchema",
  });

  
  const addSchemaInput = () => {
    /* if (formData.schemaInput.name == "" || formData.schemaInput.type == "") {
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
    }); */
    
    toast.info("This feature is currently available but should be working soon!");
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
    const tokenGateAddresses = [formData.attesterToken, formData.revokerToken];

    const tokenGateEnum = [formData.attesterStatus, formData.revokerStatus];
    const tokenGateTokenID = [
      formData.attesterTokenID,
      formData.revokerTokenID,
    ];
    write({
      args: [tokenGateAddresses, tokenGateEnum, tokenGateTokenID, params],
    });

    if (data) {
      console.log(data);
      toast.success("Success");
    }
  };

  const changeMintable = (e: any) => {
    if (e == "true") {
      setFormData({
        ...formData,
        isMintable: true,
        attestReward: 0,
      });
      return;
    } else {
      setFormData({
        ...formData,
        isMintable: false,
        mintPrice: 0,
      });
      return;
    }
  };

  const changeSelect = (e: any, type: string) => {
    if (type == "attesterStatus") {
      setFormData({
        ...formData,
        attesterStatus: e,
        attesterTokenID: 0,
        attesterToken: "0x0000000000000000000000000000000000000000",
      });
      return;
    }
    if (type == "revokerStatus") {
      setFormData({
        ...formData,
        revokerStatus: e,
        revokerTokenID: 0,
        revokerToken: "0x0000000000000000000000000000000000000000",
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
        setFormData({
          ...formData,
          attesterStatus: erc721 ? 1 : 2,
        });
      }
      if (type == "revoker") {
        setFormData({
          ...formData,
          revokerStatus: erc721 ? 1 : 2,
        });
      }
    }
  };
  
  const addRevokeAddress = (address: string) => {

    setCustomRevokers(prevAddresses => [...prevAddresses, address]);

  }
  
  const addAttestAddress = (address: string) => {
    setCustomAttesters(prevAddresses => [...prevAddresses, address]);
    
  }
  return (
    <main>
      {showRModal && <CustomAddress addresses={customRevokers} addAddress={addRevokeAddress} showModal={showRModal} setShowModal={setShowRModal} />}
      {showAModal && <CustomAddress addresses={customAttesters} addAddress={addAttestAddress} showModal={showAModal} setShowModal={setShowAModal} />}
      <div className=" p-8 m-12 rounded-md flex flex-col justify-center items-center">
        <h1 className="text-center text-2xl mb-4 text-green-300">
          Create Optimistic Attestation
        </h1>
        <div className="flex flex-col gap-8 bg-gray-600 rounded-md p-12 w-full max-w-2xl">
          <div className="items-center gap-1.5">
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
          <div className="items-center gap-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              required={true}
            />
          </div>
          <div className="grid grid-cols-6 items-end gap-2">
            <div  className="col-span-2">
            <Label htmlFor="resolutionDays">Create Input</Label>
            <Input
              name="name"
              type="text"
              value={formData.schemaInput.name}
              onChange={handleSchemaChange}
              placeholder="Enter name"
              required={true}
             
            />
            </div>
           
            <Select
              
              name="type"
              defaultValue={formData.schemaInput.type}
              onValueChange={(e) => handleTypeChange(e, "type")}
            >
              <SelectTrigger className="w-full col-span-2 bg-gray-300">
                <SelectValue placeholder="Select inputtype" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select your input type</SelectLabel>
                  <SelectItem value="string">String</SelectItem>
                  <SelectItem value="uint256">Number</SelectItem>
                  <SelectItem value="bytes">File</SelectItem>
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

          
          <div className="grid md:grid-cols-2 w-full items-center gap-1.5">
            <div className="items-center gap-1.5">
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

          <div className="grid md:grid-cols-2 w-full  items-center gap-1.5">
            <div className="col-span-1">
              <Label htmlFor="picture">Paid subscription</Label>
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
                    <SelectItem value="true">Monthly Payment</SelectItem>
                    <SelectItem value="false">Free</SelectItem>
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
              
              {/* ATTESTATION ACCESS */}
          <div className="grid grid-cols-7 w-full  items-end gap-2">
            <div className="col-span-2">
              <Label htmlFor="picture">Attest Access</Label>
              <Select
                defaultValue={formData.attesterStatus.toString()}
                onValueChange={(e) => changeSelect(e, "attesterStatus")}
              >
                <SelectTrigger
                  className="w-full"
                  name="isMintable"
                  value={formData.attesterStatus.toString()}
                >
                  <SelectValue placeholder="attesterStatus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className="text-sm">
                    <SelectItem value="0">Anyone</SelectItem>
                    <SelectItem value="4">Token</SelectItem>
                    <SelectItem value="6">WLD Holders</SelectItem>
                    <SelectItem value="7" disabled>Sismo Proof</SelectItem>
                    <SelectItem value="5">Custom</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-4">
              <Label htmlFor="attestorToken">Attesters Address</Label>
              <div className="flex w-full items-center space-x-2">
              {
                formData.attesterStatus == 5 && (
                  <Input 
                    type="text"
                    value={`${customAttesters.length} addresses`}
                    disabled={true}
                  />
                )
              }
              {
                formData.attesterStatus != 5 && (
                  <Input
                  name="attesterToken"
                  type="text"
                  value={formData.attesterToken}
                  onChange={handleChange}
                  className="text-sm"
                  placeholder="Add attestation token address (ERC721 or ERC1155)"
                  required={true}
                  disabled={formData.attesterStatus < 1}
                />
                )
              }
               
              </div>
            </div>
            <div className="col-span-1">
              {formData.attesterStatus == 4 && (
                <Button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    validateAddress("attester");
                  }}
                >
                  <PlusIcon />
                </Button>
              )}

              {formData.attesterStatus == 2 && (
                <Input
                  name="attesterTokenID"
                  type="number"
                  value={formData.attesterTokenID}
                  onChange={handleChange}
                  className="text-sm"
                  placeholder="Required"
                  required={true}
                  disabled={formData.attesterStatus < 1}
                />
              )}
              {formData.attesterStatus == 1 && (
                <Input
                  name="attesterTokenID"
                  type="number"
                  value={formData.attesterTokenID}
                  onChange={handleChange}
                  className="text-sm"
                  placeholder="Optional"
                  disabled={formData.attesterStatus < 1}
                />
              )}
               {formData.attesterStatus == 5 && (
                  <Button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowAModal(!showAModal)
                  }}
                >
                  <PlusIcon />
                </Button>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-7 w-full items-end gap-2">
            <div className="col-span-2">
              <Label htmlFor="picture">Revoker Access</Label>
              <Select
                defaultValue={formData.revokerStatus.toString()}
                onValueChange={(e) => changeSelect(e, "revokerStatus")}
              >
                <SelectTrigger
                  className="w-full"
                  name="isMintable"
                  value={formData.attesterStatus.toString()}
                >
                  <SelectValue placeholder="attesterStatus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className="text-sm">
                    <SelectItem value="0">Anyone</SelectItem>
                    <SelectItem value="4">Token</SelectItem>
                    <SelectItem value="6">WLD Holders</SelectItem>
                    <SelectItem value="7" disabled>Sismo Proof</SelectItem>
                    <SelectItem value="5">Custom</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-4">
              <Label htmlFor="attestorToken">Revoker Address</Label>
              <div className="flex w-full items-center space-x-2">
              {
                formData.revokerStatus == 5 && (
                  <Input 
                    type="text"
                    value={`${customRevokers.length} addresses`}
                    disabled={true}
                  />
                )
              }
              {
                formData.revokerStatus != 5 && (
                  <Input
                  name="revokerToken"
                  type="text"
                  value={formData.revokerToken}
                  onChange={handleChange}
                  className="text-sm"
                  placeholder="Add attestation token address (ERC721 or ERC1155)"
                  required={true}
                  disabled={formData.revokerStatus < 1}
                />
                )
              }
               
              </div>
            </div>
            <div className="col-span-1">
              {formData.revokerStatus == 4 && (
                <Button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    validateAddress("revoker");
                  }}
                >
                  <PlusIcon />
                </Button>
              )}

              {formData.revokerStatus == 2 && (
                <Input
                  name="revokerTokenID"
                  type="number"
                  value={formData.revokerTokenID}
                  onChange={handleChange}
                  className="text-sm"
                  placeholder="Required"
                  required={true}
                  disabled={formData.revokerStatus < 1}
                />
              )}
              {formData.revokerStatus == 1 && (
                <Input
                  name="revokerTokenID"
                  type="number"
                  value={formData.revokerTokenID}
                  onChange={handleChange}
                  className="text-sm"
                  placeholder="Optional"
                  disabled={formData.revokerStatus < 1}
                />
              )}
               {formData.revokerStatus == 5 && (
                  <Button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowRModal(!showRModal)
                  }}
                >
                  <PlusIcon />
                </Button>
              )}
              
            </div>
          </div>

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
