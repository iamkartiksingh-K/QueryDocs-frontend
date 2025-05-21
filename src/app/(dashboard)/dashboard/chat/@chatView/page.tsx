"use client";
import { useState } from "react";
import ChatForm from "./_components/chat-form";
export default function ChatView() {
  const [input, setInput] = useState("");
  const sendResponse = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setInput("");
    e.target.value = "";
  };
  return (
    <div className="h-full px-5 flex flex-col justify-center items-center overflow-hidden">
      <div className="grow pt-10 overflow-auto flex items-center justify-center">
        <p className="text-2xl font-semibold">Ask questions</p>
      </div>
      <ChatForm
        input={input}
        setInputAction={setInput}
        onSubmitAction={sendResponse}
      />
    </div>
  );
}
