"use client";
import { Button } from "@/components/ui/button";
import {
    CheckIcon,
    EditIcon,
    HandIcon,
    MoreHorizontalIcon,
    MoreVerticalIcon,
    SettingsIcon,
} from "lucide-react";
import Link from "next/link";

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
  return (
    <div className="bg-gray-600 rounded-md p-4 flex flex-col gap-4">
        <div className="flex justify-between">
            <h3>Name of the Attestion</h3>
            <MoreVerticalIcon className="text-gray-400 hover:text-gray-50" />
        </div>
      <div className="flex flex-col gap-2">
        <div className="rounded-md flex justify-between p-2 border border-black  ">
          <span className="text-sm"> Attestion Access</span>
          <CheckIcon className="text-green-700" />
        </div>
        <div className="rounded-md flex justify-between p-2 border border-black">
          <span className="">Revoke Access</span>
          <HandIcon className="text-red-700" />
        </div>
      </div>
      <div>
        <span>Schema properties</span>
      </div> 
      <div>
        <span className="text-gray-400">Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Veritatis quos excepturi adipisci rerum velit dicta voluptate, minima quod nam
         consequuntur nemo nulla pariatur eaque tempora? Obcaecati fugit quod quas quos.</span>
      </div>

      <div className="grid grid-cols-2 gap-4 items-center justify-center">
        <Button className="bg-green-400">Attest</Button>
        <Button className="bg-blue-500">Revoke</Button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <button
          className="font-bold flex justify-center  px-3 rounded-md py-4 text-center hover:bg-gray-400"
          onClick={doNothing}
        >
          <SettingsIcon />
        </button>
        <Link
          href="/attestions/12"
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
