"use client"

import { Badge } from "@/components/ui/badge"
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
    accessorKey: "Attester",
    header: "attestest",
  },
  {
    accessorKey: "Data",
    header: "Data",
  },
  {
    accessorKey: "time",
    header: "Status",
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      const tags = row.getValue("tags") as string;
      const tagArray = tags.split(",") as [];
      return tagArray.map((tag, i) => <Badge key={i} className="mx-1">{tag}</Badge>);

    }
  },

]
