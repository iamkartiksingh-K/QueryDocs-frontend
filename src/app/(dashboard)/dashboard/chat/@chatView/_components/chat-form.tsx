"use client";
import { Dispatch, SetStateAction } from "react";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { Button } from "@/components/ui/button";
import { CornerDownLeft } from "lucide-react";
export default function ChatForm({
  input,
  setInputAction,
  onSubmitAction,
}: {
  input: string;
  setInputAction: Dispatch<SetStateAction<string>>;
  onSubmitAction: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <form className="rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1 mt-3 max-w-[1000px] w-full mb-3">
      <ChatInput
        placeholder="Type your query here..."
        className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
        value={input}
        onChange={(e) => {
          const lastChar = e.target.value.charCodeAt(e.target.value.length - 1);
          if (lastChar === 10) {
            onSubmitAction(e);
          }
          setInputAction(e.target.value);
        }}
      />
      <div className="flex items-center p-3 pt-0">
        <Button
          size="sm"
          className="ml-auto gap-1.5 "
          variant={"default"}
          onClick={onSubmitAction}
        >
          Search
          <CornerDownLeft className="size-3.5" />
        </Button>
      </div>
    </form>
  );
}
