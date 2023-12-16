"use client";
import React, { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormError } from "./form-error";

interface FormInputProps {
  id: string;
  label?: string;
  type?: string | "text";
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      type,
      placeholder,
      required,
      disabled,
      errors,
      className,
      defaultValue = "",
      onBlur,
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label ? (
            <Label htmlFor={id} className="text-xs font-semibold">
              {label}
            </Label>
          ) : null}
          <Input
            id={id}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onBlur={onBlur}
            ref={ref}
            name={id}
            required={required}
            type={type}
            disabled={pending || disabled}
            className={cn(
                "text-sm px-2 py-1 h-7",
                className,
            )}
            aria-describedby={`${id}-error`}
          />
        </div>
        <FormError 
            id={id}
            errors={errors}
        />
      </div>
    );
  }
);

FormInput.displayName = "Input";

// apologies
