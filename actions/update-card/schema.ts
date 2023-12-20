import { z } from "zod";

export const UpdateCard = z.object({
  boardId: z.string(),
  description: z.optional(
    z.string({
      required_error: "Description is require",
      invalid_type_error: "Description is invalid",
    })
    .min(4, {
      message: "Oops description is to short much be 4 character",
    }),
  ),
  title: z.optional(
    z.string({
       required_error: "Title is require",
       invalid_type_error: "Title is invalid",
     })
     .min(4, {
       message: "Oops title is to short much be 4 character",
     }),
  ),
  id: z.string(),
});
