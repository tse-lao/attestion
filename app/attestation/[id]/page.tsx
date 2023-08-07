import AccessType from "@/components/core/attestation/access-type";
import SchemaItem from "@/components/core/attestation/schema-item";
import { Button } from "@/components/ui/button";
import AttestionDetails from "./attestion-details";

export default function AttestationPage() {
  return (
    <main className="flex flex-col items-center text-left gap-8 m-12">
      <div className="max-w-2xl flex flex-col gap-4 text-center items-center text-gray-300">
        <h1 className="text-left text-2xl tracking-wider font-light text-green-300">
          Name of the attestation
        </h1>
        <span className="text-sm text-left">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus porro
          tempore quod amet sunt architecto quas sit ratione unde reiciendis
          quaerat, ipsa vitae nemo earum, nam asperiores explicabo temporibus.
          Asperiores.
        </span>

        <div className="flex flex-col gap-4 w-full text-left mt-4">
          <h3 className="font-medium tracking-wider text-green-300">
            Schema Attributes
          </h3>

          <div className="grid grid-cols-4 gap-4">
            <SchemaItem name="name" type="string" />
            <SchemaItem name="tags" type="[]string" />
            <SchemaItem name="cid" type="string" />
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <AccessType type="Revoke Access" access={false} />
        <AccessType type="Attest Access" access={true} />
        <AccessType type="View Access" access={false} />
      </div>

      <div>
        <Button>Mint to view attestions 1 ETH</Button>
      </div>

      <AttestionDetails />
    </main>
  );
}
