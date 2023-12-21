"use client";

import { createBoard } from "@/actions/create-board";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import { useAction } from "@/hooks/use-action";
import React, { ElementRef, useEffect, useRef, useState } from "react";

import { FormInput } from "@/components/forms/form-input";
import { FormSubmit } from "@/components/forms/form-submit";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FormPicker } from "./form-picker";
import { useProModal } from "@/hooks/use-pro-modal";

interface FormPopoverProps {
  children: React.ReactNode;
  align?: "start" | "center" | "end";
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: number;
}

export const FormPopover = ({
  children,
}: FormPopoverProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const router = useRouter();
  const proModal = useProModal();

  const [isMounted, setIsMounted] = useState(false);
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success("Board created successful");
      closeRef.current?.click();
      router.push(`/board/${data.id}`)
    },
    onError: (error) => {
      toast.error(error);
      proModal.onOpen();
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;

    execute({ title, image });
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger ref={closeRef}>
        {children}
      </DialogTrigger>
      <DialogContent className="w-80 pt-3">
        <div className="text-sm font-medium text-center pb-4">
          Create new board
        </div>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormPicker id="image" errors={fieldErrors} />
            <FormInput
              id="title"
              label="Board title"
              type="text"
              errors={fieldErrors}
            />
          </div>
          <FormSubmit className="w-full">Create</FormSubmit>
        </form>
      </DialogContent>
    </Dialog>
  );
};
