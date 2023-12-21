"use client";

import { copyList } from "@/actions/copy-list";
import { deleteList } from "@/actions/delete-list";
import { FormSubmit } from "@/components/forms/form-submit";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useAction } from "@/hooks/use-action";
import { useBottomSheet } from "@/hooks/use-bottom-sheet";
import { List } from "@prisma/client";
import { Copy, MoreVertical, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ListOptionsProps {
  data: List;
}

export const ListBottomSheetOptions = ({
  data
}: ListOptionsProps) => {
  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.promise(promise, {
        loading: "Please wait few minutes",
        success: () => {
          return `${data.title} note is deleted`;
        },
      });
      onClose();
    },
    onError: (error) => {
      toast.error(`${data.title} note is deleted fail, error is ${error}`);
    },
  });

  const promise = () => new Promise((resolve) => setTimeout(resolve, 1000));

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success(`${data.title} note is copy`);
      onClose();
    },
    onError: (error) => {
      toast.error(`${data.title} note is copy fail, error is ${error}`);
    },
  });

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeDelete({ id, boardId });
  };

  const onCopy = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeCopy({ id, boardId });
  };

  const [isMounted, setIsMounted] = useState(false);

  const onOpen = useBottomSheet((state) => state.onOpen);
  const onClose = useBottomSheet((state) => state.onClose);
  const isOpen = useBottomSheet((state) => state.isOpen);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [onClose]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <button
        onClick={onOpen}
        className="border-none md:hidden block focus:outline-none focus-visible:ring-transparent"
      >
        <MoreVertical className="h-5 w-5" />
      </button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent
          side="bottom"
          className="flex-col font-semibold items-start justify-start rounded-t-xl"
        >
          <form action={onCopy}>
            <Button
              variant="secondary"
              className="flex items-center justify-start mt-3 w-full"
            >
              <input hidden name="id" id="id" value={data.id} />
              <input hidden name="boardId" id="boardId" value={data.boardId} />
              <FormSubmit
                variant="ghost"
                className="flex justify-start w-full h-auto px-0"
              >
                <Copy className="h-5 w-5 mr-2" />
                <span className="text-base font-semibold">Copy list</span>
              </FormSubmit>
            </Button>
          </form>

          <form action={onDelete}>
            <Button
              variant="secondary"
              className="font-semibold flex items-start my-3 w-full justify-start"
            >
              <input hidden name="id" id="id" value={data.id} />
              <input hidden name="boardId" id="boardId" value={data.boardId} />
              <FormSubmit
                variant="ghost"
                className="flex px-0 justify-start h-auto w-full"
              >
                <Trash className="h-5 w-5 text-red-600 group-hover:text-white mr-2" />
                <span className="text-base font-semibold">Delete this card</span>
              </FormSubmit>
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};
