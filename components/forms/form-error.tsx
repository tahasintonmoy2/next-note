import { XCircle } from "lucide-react";
import React from "react";

interface FormErrorProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export const FormError = ({ id, errors }: FormErrorProps) => {
  if (!errors) {
    return null;
  }

  return (
    <div
      id={`${id}-error`}
      aria-live="polite"
      className="mt-2 text-xs text-red-600"
    >
      {errors?.[id]?.map((error) => (
        <div
          key={error}
          className="flex items-center font-medium p-2 border border-red-500 bg-red-800/20 rounded-sm"
        >
          <XCircle className="h-4 w-4 mr-2" />
          {error}
        </div>
      ))}
    </div>
  );
};
