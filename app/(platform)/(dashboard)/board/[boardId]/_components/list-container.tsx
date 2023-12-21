"use client";
import { ListWithCards } from "@/types";
import { ListForm } from "./list-form";
import { useEffect, useState } from "react";
import { ListItem } from "./list-item";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order";
import { toast } from "sonner";
import { updateCardOrder } from "@/actions/update-card-order";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [remove] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, remove);

  return result;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);

  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success("List reorder updated");
    },
    onError: (error) => {
      toast.error(`Failed to update reorder list, error is ${error}`);
    },
  });

  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success("Card reorder updated");
    },
    onError: (error) => {
      toast.error(`Failed to update reorder card, error is ${error}`);
    },
  });

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    // if dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Users move items in the same position
    if (type === "list") {
      const items = reorder(
        orderedData,
        source.index,
        destination.index
      ).map((item, index) => ({
        ...item,
        order: index,
      }));
      setOrderedData(items);
      executeUpdateListOrder({ items, boardId })
    }

    // Users move cards
    if (type === "card") {
      let newOrderedData = [...orderedData];

      const sourceList = newOrderedData.find(
        list => list.id === source.droppableId
      );
      const destList = newOrderedData.find(
        list => list.id === destination.droppableId
      );

      if (!sourceList || !destList) {
        return;
      }

      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      if (!destList.cards) {
        destList.cards = [];
      }

      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );

        reorderedCards.forEach((card, idx) => {
          card.order = idx;
        });

        sourceList.cards = reorderedCards;

        setOrderedData(newOrderedData);

        executeUpdateCardOrder({
          boardId: boardId,
          items: reorderedCards,
        });
      } else {
        const [movedCard] = sourceList.cards.splice(source.idx, 1);

        movedCard.listId = destination.droppableId;

        destList.cards.splice(destination.idx, 0, movedCard);

        sourceList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        destList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        // Update the card for ech card in the destination list
        destList.cards.forEach((card, idx) => {
          card.order = idx;
        });
      }

      setOrderedData(newOrderedData);
      executeUpdateCardOrder({
        items: destList.cards,
        boardId: boardId,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid grid-cols-1 overflow-hidden gap-y-4 sm:grid-cols-3 lg:grid-cols-4 gap-3"
          >
            <ListForm />
            {orderedData.map((list, index) => {
              return (
                <ListItem
                  key={list.id}
                  data={list}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
