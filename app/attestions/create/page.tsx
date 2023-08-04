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
import { useState } from "react";
export default function CreateAttestion() {
  const [formData, setFormData] = useState({
    name: "DataPonte First Survey",
    description: "Lets try to see if we can make this work",
    attestRevokeBond: "1000000000000000000",
    attestRevokePeriod: "100",
    attestRevokePenalty: "1000000000000000000",
    resolutionDays: "100",
    attesterToken: "0x000000",
    attestorTokenID: "0",
    attestReward: "1000000000000000000",
    isMintable: true,
    revokersToken: "0x000000",
    revokersTokenID: "0",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <main>
      <div className=" p-8 m-12 rounded-md flex flex-col justify-center items-center">
        <h1 className="text-center text-2xl mb-4">
          Create Optimistic Attestion
        </h1>
        <div className="flex flex-col gap-4 bg-gray-600 rounded-md p-12 w-full max-w-2xl">
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
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="attestRevokeBond">Attestion Revoke bond</Label>

            <Input
              name="attestRevokeBond"
              type="text"
              value={formData.attestRevokeBond}
              onChange={handleChange}
              placeholder=" Please enter your preferred survey name here"
              required={true}
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="resultionDays">Resolution Days</Label>
            <Input
              name="resolutionDays"
              type="number"
              value={formData.resolutionDays}
              onChange={handleChange}
              placeholder=" Please enter your preferred survey name here"
              required={true}
            />
          </div>
          <div className="grid grid-cols-2 w-full  items-center gap-1.5">
            <div className="col-span-1">
            <Label htmlFor="picture">Mintable</Label>

              <Select>
                <SelectTrigger className="w-[180px]">
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
              <Label htmlFor="resultionDays">Attest Reward</Label>
              <Input
                name="attestReward"
                type="number"
                value={formData.attestReward}
                onChange={handleChange}
                placeholder=" Please enter your preferred survey name here"
                required={true}
              />
            </div>
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="attestorToken">Attesters Token</Label>
            <Input
              name="attesterToken"
              type="text"
              value={formData.attesterToken}
              onChange={handleChange}
              placeholder=" Please enter your preferred survey name here"
              required={true}
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="attesterTokenID">TokenID</Label>
            <Input
              name="attestorTokenID"
              type="number"
              value={formData.attestorTokenID}
              onChange={handleChange}
              placeholder=" Please enter your preferred survey name here"
              required={true}
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="revokersToken">Revokers Address</Label>
            <Input
              name="revokersToken"
              type="text"
              value={formData.revokersToken}
              onChange={handleChange}
              placeholder=" Please enter your preferred survey name here"
              required={true}
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="revokerTokenID">TokenID</Label>
            <Input
              name="revokersTokenID"
              type="number"
              value={formData.revokersTokenID}
              onChange={handleChange}
              placeholder=" Please enter your preferred survey name here"
              required={true}
            />
           
          </div>
        </div>
        <div className="max-w-2xl">
              <Button className="w-full bg-indigo-600" onClick={handleSubmit}>Create Attestion</Button>
            </div>
      </div>
    </main>
  );
}
