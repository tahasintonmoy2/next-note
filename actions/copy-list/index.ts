"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { CopyList } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId } = data;
  let list;

  try {
    const listToCopy = await db.list.findUnique({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      include: {
        cards: true,
      },
    });

    if (!listToCopy) {
      return { error: "404 list not found" };
    }

    const lastList = await db.list.findFirst({
      where: { boardId },
      orderBy: {
        order: "desc",
      },
      select: { order: true },
    });

    const order = lastList ? lastList.order + 1 : 1;

    list = await db.list.create({
      data: {
        title: `${listToCopy.title} - Copy`,
        boardId: listToCopy.boardId,
        order: order,
        cards: {
          createMany: {
            data: listToCopy.cards.map((card) => ({
              title: card.title,
              descrition: card.descrition,
              order: card.order,
            })),
          },
        },
      },
      include:{
        cards: true,
      }
    });
  } catch (error) {
    return {
      error: "Failed to copy list.",
    };
  }

  revalidatePath(`/organization/${boardId}`);
  return { data: list };
};

export const copyList = createSafeAction(CopyList, handler);
