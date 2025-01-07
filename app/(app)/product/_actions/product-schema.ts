import { Unit } from "@prisma/client";
import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string({
      required_error: "O nome é obrigatório",
    })
    .min(1, "Este campo é obrigatório"),
  sku: z
    .string({
      required_error: "O SKU é obrigatório",
    })
    .min(1, "Este campo é obrigatório")
    .optional(),
  barcode: z
    .string({
      required_error: "O Código de barras é obrigatório",
    })
    .min(1, "Este campo é obrigatório")
    .optional(),
  price: z.string({
    required_error: "O preço é obrigatório",
  }),
  unit: z.nativeEnum(Unit, {
    required_error: "A unidade é obrigatória",
    message: "Unidade inválida",
  }),
  minimumStock: z
    .string({
      required_error: "O estoque mínimo é obrigatório",
    })
    .transform((value) => {
      return Number(value.replace(/\D/g, ""));
    }),
  maximumStock: z
    .string({
      required_error: "O estoque máximo é obrigatório",
    })
    .transform((value) => {
      return Number(value.replace(/\D/g, ""));
    }),
  stock: z
    .string({
      required_error: "O estoque é obrigatório",
    })
    .transform((value) => {
      return Number(value.replace(/\D/g, ""));
    }),
});

export type ProductProps = z.infer<typeof productSchema>;
