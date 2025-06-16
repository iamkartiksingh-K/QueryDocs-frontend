"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { useState } from "react";
export function DeleteDocument({
  handleClick,
}: { handleClick: () => void } & React.ComponentProps<"div">) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Trash className="w-5 text-red-500 cursor-pointer" />
        </DialogTrigger>
        <DialogOverlay className="bg-white/5 backdrop-blur-sm fixed inset-0 z-50" />
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete document</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this document?</p>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              variant={"destructive"}
              onClick={() => {
                handleClick();
                setOpen(false);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
