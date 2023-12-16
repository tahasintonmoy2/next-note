import { FormPopover } from "@/components/forms/form-popover";
import { Hint } from "@/components/hint";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Info, Plus, User } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export const Boardlist = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return redirect("/select-org");
  }

  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg">
        <User className="h-6 w-6 mr-2" />
        Your boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board)=> (
          <Link 
           key={board.id}
           href={`/board/${board.id}`}
           className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-blue-600 rounded-sm w-full h-full p-2 overflow-hidden"
           style={{backgroundImage: `url(${board.imageThumbUrl})`}}
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition"/>
            <p className="text-white relative font-semibold">
              {board.title}
            </p>
          </Link>
        ))}
        <FormPopover side="right" sideOffset={0}>
          <div
            role="button"
            className="aspect-video relative h-full w-full bg-slate-200 rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
          >
            <p className="flex items-center">
              <Plus className="h-5 w-5 mr-1" />
              Create new board
            </p>
            <span className="text-xs text-slate-600">15 remaining</span>
            <Hint
              sideOffset={40}
              description={`
            Free Workspaces can have up to 15 open boards. For unlimited boards upgrade this workspace.
          `}
            >
              <Info className="h-5 w-5 absolute bottom-2 right-2" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};

Boardlist.Skeleton = function SkeletonBoardlist() {
  return (
    <div className="grid gird-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video h-full w-full p-2 bg-slate-300" />
      <Skeleton className="aspect-video h-full w-full p-2 bg-slate-300" />
      <Skeleton className="aspect-video h-full w-full p-2 bg-slate-300" />
      <Skeleton className="aspect-video h-full w-full p-2 bg-slate-300" />
      <Skeleton className="aspect-video h-full w-full p-2 bg-slate-300" />
      <Skeleton className="aspect-video h-full w-full p-2 bg-slate-300" />
      <Skeleton className="aspect-video h-full w-full p-2 bg-slate-300" />
      <Skeleton className="aspect-video h-full w-full p-2 bg-slate-300" />
    </div>
  );
};