"use client";

import { useState, useEffect } from "react";
import { DataTable } from "./data-table";
import { getColumns, type Docs } from "./columns";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import Modal from "@/components/ui/modal";
import { FiFolder, FiUploadCloud } from "react-icons/fi";

export default function Docs() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [docs, setDocs] = useState<Docs[]>([]);

  async function loadDocuments() {
    const response = await fetch("/api/documents");
    const data = await response.json();
    setDocs(data.results);
    console.log(data);
  }

  useEffect(() => {
    loadDocuments();
  }, []);

  const handleUploadClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full px-16 pt-10">
      <div className="flex items-end w-full justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Documents</h1>
          <p className="text-gray-500 text-sm mt-1">
            View your uploaded documents here
          </p>
        </div>
        <Button onClick={handleUploadClick}>
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </Button>
      </div>

      <div className="w-full mt-18">
        <DataTable columns={getColumns(loadDocuments)} data={docs} />
      </div>

      {/* Upload Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="flex flex-col items-center">
          <FiFolder className="text-yellow-500 text-4xl mb-2" />
          <h2 className="text-xl font-semibold">Upload Files</h2>
          <p className="text-sm text-gray-500 mt-1">Attach a file below:</p>

          <div className="mt-4 w-full border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition relative">
            <FiUploadCloud className="text-black-400 text-3xl mb-2" />
            <p className="text-gray-500 text-sm text-center">
              Drag files here to upload <br />
              <span className="underline">or click to select files</span>
            </p>
            <input
              type="file"
              className="opacity-0 absolute w-full h-full top-0 left-0 cursor-pointer"
            />
          </div>

          <div className="flex justify-end w-full mt-6 gap-3">
            <button
              onClick={handleCloseModal}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 bg-gray-100 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button className="px-4 py-2 rounded-md text-white bg-black hover:bg-neutral-900">
              Upload File
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
