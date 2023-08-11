"use client"

import { Checkbox } from "@/components/ui/checkbox"
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
    header: "name",
    cell: ({ row }) => {
      const data = row.getValue("decodedDataJson") as any;
 
      return <div className="text-right font-medium">{data.name}</div>
    },
  },
  {
    accessorKey: "decodedDataJson",
    header: "file",
    cell: ({ row }) => {
      const data = row.getValue("decodedDataJson") as any
 
      return <div className="text-right font-medium">{data.file}</div>
    },
  },
  {
    accessorKey: "decodedDataJson",
    header: "description",
    cell: ({ row }) => {
      const data = row.getValue("decodedDataJson") as any;
 
      return <div className="text-right font-medium">{data.description}</div>
    },
  },
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },


]
