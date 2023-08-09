"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Attestion = {
  id: string
  name: string
  tags: string
  file: string
  status: "attested" | "revoked" | "finished"
  email: string
}

export const AttestionColumns: ColumnDef<any>[] = [
  {
    accessorKey: "attester",
    header: "attestest",
  },
  {
    accessorKey: "decodedDataJson",
    header: "Name",
    cell: ({ row }) => {
      const data = row.getValue("attester") as string;
      return data;
    }
  },
  {
    accessorKey: "decodedDataJson",
    header: "Description",
    cell: ({ row }) => {
      const data = row.getValue("timeCreated") as string;
      return data;
    }
  },
  {
    accessorKey: "decodedDataJson",
    header: "Cid",
    cell: ({ row }) => {
      const data = row.getValue("timeCreated") as string;
      return data;
    }
  },

]
