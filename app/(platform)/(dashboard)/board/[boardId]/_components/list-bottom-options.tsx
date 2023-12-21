"use client";

import { copyList } from "@/actions/copy-list";
import { deleteList } from "@/actions/delete-list";
import { FormSubmit } from "@/components/forms/form-submit";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAction } from "@/hooks/use-action";
import { List } from "@prisma/client";
import { Copy, MoreVertical, Plus, Trash } from "lucide-react";
import { toast } from "sonner";

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

export const ListBottomSheetOptions = ({
  data,
  onAddCard,
}: ListOptionsProps) => {
  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.promise(promise, {
        loading: "Please wait few minutes",
        success: () => {
          return `${data.title} note is deleted`;
        },
      });
    },
    onError: (error) => {
      toast.error(`${data.title} note is deleted fail, error is ${error}`);
    },
  });

  const promise = () => new Promise((resolve) => setTimeout(resolve, 1000));

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success(`${data.title} note is copy`);
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

  return (
    <>
      <Sheet>
        <SheetTrigger className="border-none md:hidden block focus:outline-none focus-visible:ring-transparent">
          <MoreVertical className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="flex-col font-semibold items-start justify-start rounded-t-xl"
        >
          <Button
            variant="secondary"
            className="flex items-center justify-start  mt-3 w-full"
          >
            <form action={onCopy}>
              <input hidden name="id" id="id" value={data.id} />
              <input hidden name="boardId" id="boardId" value={data.boardId} />
              <FormSubmit
                variant="ghost"
                className="flex justify-start w-full h-auto px-0"
              >
                <Copy className="h-5 w-5 mr-2" />
                <span className="text-base font-semibold">Copy list</span>
              </FormSubmit>
            </form>
          </Button>
          <Button
            variant="secondary"
            onClick={onAddCard}
            className="flex items-center justify-start  mt-3 w-full"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add new card
          </Button>
          <Button
            variant="secondary"
            className="font-semibold flex items-start my-3 w-full justify-start"
          >
            <form action={onDelete}>
              <input hidden name="id" id="id" value={data.id} />
              <input hidden name="boardId" id="boardId" value={data.boardId} />
              <FormSubmit
                variant="ghost"
                className="flex justify-start w-full h-auto px-0"
              >
                <span className="hover:bg-red-600/80 group hover:text-white flex items-center px-1.5 py-1 rounded-sm">
                  <Trash className="h-5 w-5 text-red-600 group-hover:text-white mr-2" />
                  Delete this card
                </span>
              </FormSubmit>
            </form>
          </Button>
        </SheetContent>
      </Sheet>
    </>
  );
};
