"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Attestion = {
  id: string
  name: string
  tags: string
  cid: string
  status: "attested" | "revoked" | "finished"
  time: number
}

export const resolveColumns: ColumnDef<Attestion>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  
  {
    accessorKey: "cid",
    header: "Cid",
  },
  {
    accessorKey: "tags",
    header: "Tags",
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => {
      const futureTimestamp = parseFloat(row.getValue("time"))
      let countdownInterval:any = setInterval(() => {
        let currentTimestamp = Math.floor(Date.now() / 1000);
        let secondsLeft = futureTimestamp - currentTimestamp;
        return secondsLeft; 
        
    }, 1000);
 
      return <div className="text-right font-medium">{countdownInterval}</div>
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
