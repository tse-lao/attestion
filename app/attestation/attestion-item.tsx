"use client";
import AccessType from "@/components/core/attestation/access-type";
import SchemaItem from "@/components/core/attestation/schema-item";
import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  EditIcon,
  MoreHorizontalIcon,
  MoreVerticalIcon,
  SettingsIcon
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";

export function AttestionAccess() {
  return (
    <div className="bg-gray-600 rounded-md p-4">
      <span>Attestion Access</span>
      <CheckIcon className="text-green-700" />
    </div>
  );
}

export default function AttestionItem() {
  const doNothing = () => {
    console.log("clicked");
  };
  
  const attest = () => {
    toast.success("Attestation Access Granted");
  }
  
  const revoke = () => {
    toast.error("Attestation Access Revoked");
  }
  return (
    <div className="bg-gray-600 rounded-md p-4 flex flex-col gap-4 hover:outline hover:outline-green-300" >
        <div className="flex justify-between pt-4 px-4">
            <Link className="text-xl text-white underline" href="/attestation/123">Name of the Attestion</Link>
            <MoreVerticalIcon className="text-gray-400 hover:text-gray-50 z-10" />
        </div>
        <div>
        <span className="text-gray-200 italic font-light text-sm m-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
          Veritatis quos excepturi adipisci rerum velit dicta voluptate, minima quod nam
          consequuntur nemo nulla pariatur eaque tempora? Obcaecati fugit quod quas quos.
         </span>
      </div>
      <div className="flex flex-col gap-2">
        <AccessType type="Revoke Access" access={false} />
        <AccessType type="Attestation Access" access={true} />
      </div>
      <div>
        <h3 className="text-green-300">Schema properties</h3>
        <div className="grid grid-cols-3 m-3">
        <SchemaItem name="Name" type="string" />
        <SchemaItem name="Tags" type="string[]" />
        <SchemaItem name="cid" type="string" />
          
        </div>
      </div> 
     

      <div className="grid grid-cols-2 gap-4 items-center justify-center">
        <Button className="border border-green-400 z-10" onClick={attest}>Attest</Button>
        <Button className="border border-blue-500 z-10" onClick={revoke}>Revoke</Button>
      </div>
      <div className="grid grid-cols-3 gap-2 hidden">
        <button
          className="font-bold flex justify-center  px-3 rounded-md py-4 text-center hover:bg-gray-400"
          onClick={doNothing}
        >
          <SettingsIcon />
        </button>
        <Link
          href="/attestation/12"
          className=" font-bold flex justify-center  px-3 rounded-md py-4 text-center hover:bg-gray-400"
        >
          <EditIcon />
        </Link>
        <button
          className=" flex justify-center  py-4 font-bold hover:bg-gray-400   px-3 rounded-md"
          onClick={doNothing}
        >
          <MoreHorizontalIcon />
        </button>
      </div>
    </div>
  );
}
