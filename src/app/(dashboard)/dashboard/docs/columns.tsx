"use client";
import { DeleteDocument } from "@/components/delete-modal";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type Docs = {
  document_id: string;
  name: string;
  url: string;
  size?: string;
  created?: string;
};
export const getColumns = (refreshDocuments: () => void): ColumnDef<Docs>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
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
    ),
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
    cell: ({ row }) => (
      <DeleteDocument
        handleClick={async () => {
          await fetch("/api/documents", {
            method: "DELETE",
            body: JSON.stringify({
              document_id: row.original.document_id,
            }),
          });
          refreshDocuments(); // reload the documents
        }}
      />
    ),
  },
];
