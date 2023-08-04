"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Attestion = {
  id: string
  name: string
  tags: string
  cid: string
  status: "attested" | "revoked" | "finished"
  email: string
}

export const AttestionColumns: ColumnDef<Attestion>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "cid",
    header: "Cid",
  },
  {
    accessorKey: "tags",
    header: "Tags",
  },
]
