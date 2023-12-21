"use client";

import { List } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";

import { updateList } from "@/actions/update-list";
import { FormInput } from "@/components/forms/form-input";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { CornerDownLeft } from "lucide-react";
import { ListBottomSheetOptions } from "./list-bottom-options";
import { ListOptions } from "./list-options";

interface ListHeaderProps {
  data: List;
  onAddCard: () => void;
}

export const ListHeader = ({ data, onAddCard }: ListHeaderProps) => {
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`${title} renamed to "${data.title}"`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    if (title === data.title) {
      return disableEditing();
    }

    execute({
      title,
      id,
      boardId,
    });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeyDown);

  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start- gap-x-2">
      <div>
        {isEditing ? (
          <>
            <form
              ref={formRef}
              action={handleSubmit}
              className="flex-1 px-[2px]"
            >
              <input hidden id="id" name="id" value={data.id} />
              <input hidden id="boardId" name="boardId" value={data.boardId} />
              <FormInput
                ref={inputRef}
                onBlur={onBlur}
                id="title"
                placeholder="Enter list title.."
                defaultValue={title}
                className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
              />
              <button type="submit" hidden />
            </form>
            {process.platform === "darwin" ? (
              <p>Press cmd</p>
            ) : (
              <p className="mt-2 text-sm font-normal text-gray-400">
                Press enter to save
              </p>
            )}
            {process.platform === "android" && (
              <p className="mt-2 text-sm font-normal text-gray-400">
                Press <CornerDownLeft className="h-4 w-4 px-3" /> to save
              </p>
            )}
            <Button onClick={disableEditing} size="sm" className="mt-1">
              Cancel
            </Button>
          </>
        ) : (
          <div
            onClick={enableEditing}
            className="w-full text-sm px-2.5 py-1 h-7 cursor-pointer font-medium border-transparent"
          >
            {title}
          </div>
        )}
      </div>
      <div className="md:hidden block">
        <ListBottomSheetOptions data={data} onAddCard={onAddCard} />
      </div>
      <div className="md:block hidden">
        <ListOptions data={data} onAddCard={onAddCard} />
      </div>
    </div>
  );
};
