import { z } from "zod";

export type FieldErrors<T> = {
  [K in keyof T]?: string[];
};

export type ActionState<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput>;
  error?: string | null;
  data?: TOutput;
};

export const createSafeAction = <TInput, TOutput>(
    schema: z.Schema<TInput>,
    handler: (vaildatedData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
  return async (data:TInput): Promise<ActionState<TInput, TOutput>> => {
    const vaildationResult = schema.safeParse(data);
    if (!vaildationResult.success) {
        return {
            fieldErrors:vaildationResult.error.flatten().fieldErrors as FieldErrors<TInput>
        }
    }

    return handler(vaildationResult.data)
  }
}