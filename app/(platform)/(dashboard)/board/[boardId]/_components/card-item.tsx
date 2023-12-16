"use client";

import { useCardModal } from "@/hooks/use-card-modal";
import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@prisma/client";
import { PenSquare } from "lucide-react";

interface CardItemProps {
  data: Card;
  index: number;
}

export const CardItem = ({ 
  data, index 
}: CardItemProps) => {
  const cardModal = useCardModal();

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() => cardModal.onOpen(data.id)}
          role="button"
          className="truncate border-2 group border-transparent hover:border-blue-600 py-2 px-3 text-sm bg-white rounded-md shadow-sm"
        >
          <div className="flex items-center justify-between">
            {data.title}
            <PenSquare className="h-5 w-5 text-blue-500 opacity-0 group-hover:opacity-100" />
          </div>
        </div>
      )}
    </Draggable>
  );
};
