"use client";

import { deleteBoard } from "@/actions/delete-board";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAction } from "@/hooks/use-action";
import { useAuth } from "@clerk/nextjs";
import { Board } from "@prisma/client";
import { ArrowLeft, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface BoardOptionsProps {
  id: string;
  board: Board;
}

//
export const BoardOptions = ({ id, board }: BoardOptionsProps) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => {
      toast.error(`Delete fail error is ${error}`);
    },
  });

  const router = useRouter();
  const { orgId } = useAuth();

  const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

  if (isLoading) {
    toast.promise(promise, {
      loading: "Please wait few minutes",
      success: () => {
        return "Board deleted now redirecting to organization page";
      },
    });
  }

  const onDelete = () => {
    execute({ id });
  };

  const onRedirect = () => {
    router.push(`/organization/${orgId}`);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none">
          <MoreHorizontal className="h-5 w-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={onRedirect}
            disabled={isLoading}
            className="md:hidden items-center flex"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Return to {board.title} org page
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete} disabled={isLoading}>
            <Trash className="h-4 w-4 text-red-600 mr-2" />
            Delete this board
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
