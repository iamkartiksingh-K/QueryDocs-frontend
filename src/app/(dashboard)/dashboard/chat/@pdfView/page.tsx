"use client";
import { useState } from "react";
import ListItem from "./_components/list-item";
import ViewPdf from "./_components/pdf-viewer";

export default function PDFView() {
  const [selected, setSelected] = useState(0);
  const docList = [
    {
      title: "Book 1",
      icon: "/pdf.png",
    },
    {
      title: "Book 1",
      icon: "/pdf.png",
    },
    {
      title: "Book 1",
      icon: "/pdf.png",
    },
  ];

  return (
    <div className="h-dvh flex">
      <ViewPdf className="grow" />
      <div className="min-w-[100px] h-11/12 flex flex-col items-center justify-center gap-3 overflow-auto">
        {docList.map((doc, index) => {
          return (
            <ListItem
              title={doc.title}
              icon={doc.icon}
              key={index}
              id={index}
              selected={selected}
              onClick={() => setSelected(index)}
            />
          );
        })}
      </div>
    </div>
  );
}
