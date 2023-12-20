"use client";

import { createCard } from "@/actions/create-card";
import { FormSubmit } from "@/components/forms/form-submit";
import { FormTextarea } from "@/components/forms/form-textarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, KeyboardEventHandler, forwardRef, useRef } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface CardFormProps {
  listId: string;
  disableEditing: () => void;
  enableEditing: () => void;
  isEditing: boolean;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(({
  listId,
  enableEditing,
  disableEditing,
  isEditing,
}, ref) => {
    const params = useParams()
    const formRef = useRef<ElementRef<"form">>(null);

    const { execute, fieldErrors } = useAction(createCard, {
        onSuccess:(data) => {
            toast.success(`Card "${data.title}" created`);
            disableEditing();
            formRef.current?.reset();
        },
        onError:(error)=> {
            toast.error(`Card created fail error is ${error}`);
        },
    });

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            disableEditing();
        }
    }

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeyDown);

    const onTextareakeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            formRef.current?.requestSubmit();
        }
    }

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const listId = formData.get("listId") as string;
        const boardId = params.boardId as string;

        execute({title, listId, boardId});
    }

    if (isEditing) {
       return (
        <form 
         ref={formRef} 
         action={onSubmit} 
         className="m-1 py-0.5 px-1 space-y-4"
        >
            <FormTextarea 
              id="title"
              onKeyDown={onTextareakeyDown}
              ref={ref}
              placeholder="Enter a card description"
              errors={fieldErrors}
            />

            <input hidden name="listId" id="listId" value={listId} />
            <div className="flex items-center gap-x-1">
              <FormSubmit>
                Add card
              </FormSubmit>
              <Button onClick={disableEditing} variant="ghost" size="sm" >
                Cancel
              </Button>
            </div>
        </form>
       ) 
    }


  return (
    <div className="pt-2 px-2">
       <Button
        onClick={enableEditing}
        className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
        size="sm"
        variant="ghost"
       >
         <Plus className="h-5 w-5 mr-2"/>
          Add new card
       </Button>
    </div>
  );
});

CardForm.displayName = "CardForm";
