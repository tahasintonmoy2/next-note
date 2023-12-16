"use client";

import { deleteBoard } from "@/actions/delete-board";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAction } from "@/hooks/use-action";
import { MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";

interface BoardOptionsProps {
  id: string;
}
//
export const BoardOptions = ({ id }: BoardOptionsProps) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => {
      toast.error(`Delete fail error is ${error}`);
    },
  });

  const onDelete = () => {
    execute({ id });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none">
          <MoreHorizontal className="h-5 w-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Board Option</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onDelete} disabled={isLoading}>
            <Trash className="h-4 w-4 text-red-600 mr-2" />
            Delete this board
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
