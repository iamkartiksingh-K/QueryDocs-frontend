"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Ellipsis } from "lucide-react";
import Image from "next/image";

export type Docs = {
  name: string;
  url: string;
  size: string;
  created: string;
};
export const columns: ColumnDef<Docs>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      console.log(row.original);
      return (
        <div className="flex items-end">
          <Image
            src={"/pdf.png"}
            className="w-6 mr-3"
            alt="pdf icon"
            width={100}
            height={100}
          />
          {row.original.name}
        </div>
      );
    },
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "created",
    header: "Created on",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: () => {
      return <Ellipsis />;
    },
  },
];
