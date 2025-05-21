"use client";
import { useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/zoom/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";

import CustomZoom from "./zoom";
import { ZoomIn, ZoomOut } from "lucide-react";
const fileUrl = "http://localhost:5000/files/masters-marksheets.pdf";
export default function ViewPdf({ className }: { className?: string }) {
  const [currentZoom, setCurrentZoom] = useState(1);
  const zoomPluginInstance = zoomPlugin();
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { CurrentPageLabel, NumberOfPages } = pageNavigationPluginInstance;
  const { zoomTo } = zoomPluginInstance;
  const increaseZoom = () => {
    if (currentZoom >= 10) return;
    zoomTo(currentZoom + 0.2);
    setCurrentZoom((prev: number) => prev + 0.2);
  };
  const decreaseZoom = () => {
    if (currentZoom <= 1) return;
    zoomTo(currentZoom - 0.2);
    setCurrentZoom((prev: number) => prev - 0.2);
  };
  return (
    <div className={`h-dvh ${className}`}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
        <div>
          <div className={"h-dvh flex flex-col border"}>
            <div className="flex items-center justify-between border-b p-2 h-16">
              <div>
                <CustomZoom onClick={increaseZoom} className="mr-8 ml-3">
                  <ZoomIn />
                </CustomZoom>
                <CustomZoom onClick={decreaseZoom}>
                  <ZoomOut />
                </CustomZoom>
              </div>
              <div className="mr-4 text-sm text-gray-600">
                <span className="">Page </span>
                <CurrentPageLabel /> <span>/</span> <NumberOfPages />
              </div>
            </div>
            <div className="h-11/12 overflow-auto">
              <Viewer
                fileUrl={fileUrl}
                plugins={[zoomPluginInstance, pageNavigationPluginInstance]}
                defaultScale={1}
              />
            </div>
          </div>
        </div>
      </Worker>
    </div>
  );
}
