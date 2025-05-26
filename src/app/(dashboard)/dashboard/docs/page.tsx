import { DataTable } from "./data-table";
import { columns, type Docs } from "./columns";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
export default function Docs() {
  const data: Docs[] = [
    {
      name: "Book1",
      url: "#",
      size: "500KB",
      created: "16 May 2025",
    },
  ];
  return (
    <div className="w-full px-16 pt-10">
      <div className="flex items-end w-full justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Documents</h1>
          <p className="text-gray-500 text-sm mt-1">
            View your uploaded documents here
          </p>
        </div>
        <Button>
          <Upload />
          Upload
        </Button>
      </div>
      <div className="w-full mt-18">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
