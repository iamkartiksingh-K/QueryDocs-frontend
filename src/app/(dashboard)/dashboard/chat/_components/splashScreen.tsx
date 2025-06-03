import { Button } from "@/components/ui/button";
import RobotAnimation from "./robot-animation";
import { Dispatch, SetStateAction, useState } from "react";
import LoadingAnimation from "./loading-animation";

export default function SplashScreen({
  setShowChat,
}: {
  setShowChat: Dispatch<SetStateAction<boolean>>;
}) {
  const [loadDocuments, setLoadDocuments] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center">
      {loadDocuments ? (
        <>
          <LoadingAnimation />
          <p className="text-xs text-gray-700 mt-10">
            Hang in there we are loading your documents !
          </p>
        </>
      ) : (
        <>
          <RobotAnimation />
          <h1 className="font-semibold text-2xl mt-10">Ready to Talk?</h1>
          <Button
            className="mt-5"
            onClick={() => {
              setLoadDocuments(true);
            }}
          >
            Start Chat
          </Button>
        </>
      )}
    </div>
  );
}
