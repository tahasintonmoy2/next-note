"use client";

import { copyList } from "@/actions/copy-list";
import { deleteList } from "@/actions/delete-list";
import { FormSubmit } from "@/components/forms/form-submit";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAction } from "@/hooks/use-action";
import { List } from "@prisma/client";
import { Copy, MoreVertical, Plus, Trash } from "lucide-react";
import { toast } from "sonner";

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`${data.title} note is deleted`);
    },
    onError: (error) => {
      toast.error(`${data.title} note is deleted fail, error is ${error}`);
    },
  });

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
      <DropdownMenu>
        <DropdownMenuTrigger className="border-none focus:outline-none focus-visible:ring-transparent">
          <MoreVertical className="h-5 w-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="flex-col font-semibold items-start justify-start"
        >
          <DropdownMenuLabel>Note Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="font-semibold">
            <form action={onCopy}>
              <input hidden name="id" id="id" value={data.id} />
              <input hidden name="boardId" id="boardId" value={data.boardId} />
              <FormSubmit
                variant="ghost"
                className="flex justify-start w-full h-auto px-0"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy list
              </FormSubmit>
            </form>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onAddCard}>
            <Plus className="h-4 w-4 mr-2" />
            Add new card
          </DropdownMenuItem>
          <DropdownMenuItem className="font-semibold flex items-start justify-start">
            <form action={onDelete}>
              <input hidden name="id" id="id" value={data.id} />
              <input hidden name="boardId" id="boardId" value={data.boardId} />
              <FormSubmit
                variant="ghost"
                className="flex justify-start w-full h-auto px-0"
              >
                <span className="hover:bg-red-600/80 group hover:text-white flex items-center px-1.5 py-1 rounded-sm">
                  <Trash className="h-4 w-4 text-red-600 group-hover:text-white mr-2" />
                  Delete this card
                </span>
              </FormSubmit>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
