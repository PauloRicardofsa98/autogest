import { z } from "zod";

export const serviceSchema = z.object({
  name: z
    .string({
      required_error: "O nome é obrigatório",
    })
    .min(1, "Este campo é obrigatório"),

  price: z.string({
    required_error: "O preço é obrigatório",
  }),
});

export type ServiceProps = z.infer<typeof serviceSchema>;
