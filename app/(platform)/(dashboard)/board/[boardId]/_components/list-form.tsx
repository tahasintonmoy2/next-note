"use client";
import React, { useState, useRef, ElementRef, Key } from "react";
import { ListWrapper } from "./list-wrapper";
import { Plus } from "lucide-react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormInput } from "@/components/forms/form-input";
import { useParams, useRouter } from "next/navigation";
import { FormSubmit } from "@/components/forms/form-submit";
import { useAction } from "@/hooks/use-action";
import { createList } from "@/actions/create-list";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export const ListForm = () => {
  const params = useParams();
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<ElementRef<"input">>(null);
  const formRef = useRef<ElementRef<"form">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    disableEditing();
  };

  const {execute, fieldErrors, isLoading} = useAction(createList, {
    onSuccess: () => {
      disableEditing();
      toast.success("List created successfully");
      router.refresh();
    },
    onError: () => {
      toast.error("Failed to create list")
    },
  });

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCancel();
    } else if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown, inputRef);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (fromData: FormData) => {
    const title = fromData.get("title") as string;
    const boardId = fromData.get("boardId") as string;
    execute({title, boardId})
  };

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full p-3 bg-white rounded-md space-y-4 shadow-md"
        >
          <FormInput
            id="title"
            ref={inputRef}
            errors={fieldErrors}
            disabled={isLoading}
            type="text"
            className="w-full px-2 py-1 bg-transparent transition outline-none"
            placeholder="Enter list title..."
          />
          <input value={params.boardId} hidden name="boardId" />
          <div className="flex items-center gap-x-1">
            <FormSubmit disabled={isLoading}>
              Add list
            </FormSubmit>
            <Button onClick={disableEditing} variant="ghost" size="sm" >
              Cancel
            </Button>            
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        type="submit"
        className="w-full bg-white/80 hover:bg-white/90 transition p-3 flex items-center text-sm rounded-md"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add a list
      </button>
    </ListWrapper>
  );
};
