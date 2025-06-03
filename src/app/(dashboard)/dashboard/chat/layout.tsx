"use client";
import { useState, useEffect } from "react";
import Tab from "./_components/tab";
import TabsContainer from "./_components/tabs-container";
import SplashScreen from "./_components/splashScreen";
import classNames from "classnames";

export default function ChatLayout({
  chatView,
  pdfView,
}: {
  chatView: React.ReactNode;
  pdfView: React.ReactNode;
}) {
  const [visible, setVisible] = useState(1);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      console.log(visible);
      if (window.innerWidth > 1022) setVisible(-1);
      else if (visible === -1) setVisible(1);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [visible]);

  useEffect(() => {}, []);
  const tabClass = classNames("fixed block lg:hidden");
  const chatClass = classNames("w-10/12 lg:w-1/2 lg:block", {
    ["block"]: visible === 1 || visible === -1,
    ["hidden"]: visible === 2,
  });
  const pdfClass = classNames("w-12/12 lg:block lg:w-1/2", {
    ["block"]: visible === 2 || visible === -1,
    ["hidden"]: visible === 1,
  });
  return (
    <div className="flex justify-center h-screen">
      {showChat ? (
        <>
          <TabsContainer className={tabClass}>
            <Tab id={1} selected={visible} select={() => setVisible(1)}>
              Chat
            </Tab>
            <Tab id={2} selected={visible} select={() => setVisible(2)}>
              Docs
            </Tab>
          </TabsContainer>
          <div className={chatClass}>{chatView}</div>
          <div className={pdfClass}>{pdfView}</div>
        </>
      ) : (
        <SplashScreen />
      )}
    </div>
  );
}
