"use client";
import React, { forwardRef, KeyboardEventHandler } from "react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { FormError } from "./form-error";

interface FormTextareaProps {
  id: string;
  label?: string;
  type?: string | "text";
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  onClick?: () => void;
  onBlur?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
  defaultValue?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(({
    id,
    label,
    type,
    placeholder,
    required,
    disabled,
    errors,
    className,
    onClick,
    onBlur,
    onKeyDown,
    defaultValue,
}, ref) => {
    const {pending} = useFormStatus()

  return (
    <div className="space-y-2 w-full">
      <div className="space-y-1 w-full">
        {label ? (
          <Label htmlFor={id} className="text-xs font-medium">
            {label}
          </Label>
        ): null}
        <Textarea 
         onKeyDown={onKeyDown}
         onBlur={onBlur}
         onClick={onClick}
         ref={ref}
         required={required}
         placeholder={placeholder}
         name={id}
         disabled={pending || disabled}
         id={id}
         className={cn(
            "resize-none transition shadow-sm",
            className
        )}
         aria-describedby={`${id}-error`}
         defaultValue={defaultValue}
         />
      </div>
      <FormError id={id} errors={errors}/>
    </div>
  )
})

FormTextarea.displayName = "FormTextarea";