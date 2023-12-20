"use client";

import { updateCard } from "@/actions/update-card";
import { FormInput } from "@/components/forms/form-input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { Layout } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface HeaderProps {
  data: CardWithList;
}

export const Header = ({ data }: HeaderProps) => {
  const queryClient = useQueryClient();
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);

  const { execute } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id]
      })       
      
      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id]
      })

      toast.success(`Card renamed this ${title} to "${data.title}"`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(inputRef, disableEditing);

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const [title, setTitle] = useState(data.title);

  const onSubmit = (formData: FormData) => {
    const title = (formData.get("title")) as string;
    const boardId = params.boardId as string;

    if (title === data.title) {
        return;
    }

    execute({
        title,
        boardId,
        id: data.id
    })
  };

  return (
    <div className="flex items-start gap-x-3 mb-6 w-full">
      <Layout className="h-6 w-6 mt-1" />
      <div className="w-full">
        {isEditing ? (
            <form action={onSubmit} className="mr-4">
            <FormInput
                ref={inputRef}
                onBlur={onBlur}
                id="title"
                defaultValue={title}
                className="font-semibold text-xl px-1 ml-2 hover:bg-transparent bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate"
            />
            </form>
        ): (
            <div
            onClick={enableEditing}
            role="button"
            className="font-semibold text-xl px-1 ml-2 relative -left-1.5 w-[95%] rounded-md hover:bg-slate-100 mb-0.5 truncate"
            >
            {data.title}
          </div>
        )}
        <p className="text-sm text-muted-foreground ml-2">
          in list <span className="text-blue-600">{data.list.title}</span>
        </p>
      </div>
    </div>
  );
};

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="flex items-start gap-x-3 mb-6">
      <Skeleton className="h-6 w-6 mt-1 bg-neutral-200" />
      <div>
        <Skeleton className="w-24 h-6 mb-1 bg-neutral-200" />
        <Skeleton className="w-12 h-4 bg-neutral-200" />
      </div>
    </div>
  );
};
