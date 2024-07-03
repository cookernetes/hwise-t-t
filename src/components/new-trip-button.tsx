"use client";

import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";

export default function NewTripButton({
  className,
  onNewTrip,
}: {
  className: string;
  onNewTrip: (tripName: string) => void;
}) {
  const [isOpen, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={className}>
          <PlusCircle className={"mr-2 h-4 w-4"} /> New Trip
        </Button>
      </DialogTrigger>
      <DialogContent className={"sm:max-w-[425px]"}>
        <DialogHeader>
          <DialogTitle>Create a New Trip</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOpen(false);
            onNewTrip(inputRef.current!.value);
          }}
        >
          <div className={"grid gap-4 py-4"}>
            <div className={"grid grid-cols-4 items-center gap-4"}>
              <Label htmlFor={"name"} className={"text-right"}>
                Trip Name
              </Label>
              <Input id={"name"} className={"col-span-3"} ref={inputRef} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild={true}>
              <Button type={"submit"}>Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
