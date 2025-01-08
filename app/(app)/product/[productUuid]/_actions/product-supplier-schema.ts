import { z } from "zod";

export const productSupplierSchema = z.object({
  supplierUuid: z
    .string({
      required_error: "O fornecedor é obrigatório",
    })
    .min(1, "Este campo é obrigatório"),
  costPrice: z.string({
    required_error: "O preço de custo é obrigatório",
  }),
});

export type ProductSupplierProps = z.infer<typeof productSupplierSchema>;
