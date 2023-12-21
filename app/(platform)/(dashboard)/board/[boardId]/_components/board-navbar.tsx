import { Board } from "@prisma/client";
import { BoardTitleForm } from "./board-title-form";
import { BoardOptions } from "./board-options";
import Link from "next/link";
import { auth } from "@clerk/nextjs";

interface BoardNavbarProps {
  data: Board;
}

export const BoardNavbar = async ({
  data
}: BoardNavbarProps) => {
  const { orgId } = auth()

  return (
    <div className="w-full h-14 z-[40] fixed bg-black/50 top-14 flex items-center px-6 gap-x-4 text-white">
      <Link href={`/organization/${orgId}`} className="text-sm md:block hidden">
        Return to {data.title} org page.
      </Link>
      <BoardTitleForm data={data} />
      <div className="ml-auto">
        <BoardOptions id={data.id} board={data} />
      </div>
    </div>
  );
};
