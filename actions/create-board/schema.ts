import { z } from "zod";

export const CreateBoard = z.object({
    title: z.string({
        required_error: "Title is require",
        invalid_type_error: "Title is invalid"
    }).min(4, {
        message: "Oops title is to short much be 4 character"
    }),
    image: z.string({
        required_error: "Image is require",
        invalid_type_error: "Image is require",
    })
});