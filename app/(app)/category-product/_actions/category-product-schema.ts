import { z } from "zod";

export const categoryProductSchema = z.object({
  name: z
    .string({
      required_error: "O nome é obrigatório",
    })
    .min(1, "Este campo é obrigatório"),
});

export type CategoryProductProps = z.infer<typeof categoryProductSchema>;
