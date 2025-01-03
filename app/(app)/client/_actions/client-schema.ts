import { validateCpfCnpj } from "@/app/_utils/validations";
import { z } from "zod";

export const clientSchema = z.object({
  name: z
    .string({
      required_error: "O nome é obrigatório",
    })
    .min(1, "Este campo é obrigatório"),

  cpfCnpj: z
    .string({
      required_error: "O cpf/cnpj é obrigatório",
    })
    .min(1, "Este campo é obrigatório")
    .refine((value) => validateCpfCnpj(value), {
      message: "CPF/CNPJ inválido",
    }),
  phone: z
    .string({
      required_error: "O contato é obrigatório",
    })
    .min(1, "Este campo é obrigatório"),
  email: z
    .string({
      required_error: "O email é obrigatório",
    })
    .email({
      message: "Email inválido",
    })
    .min(1, "Este campo é obrigatório"),
  address: z
    .string({
      required_error: "O endereço é obrigatório",
    })
    .min(1, "Este campo é obrigatório"),
  observations: z
    .string({
      invalid_type_error: "Observation must be a string",
    })
    .default(""),
});

export type ClientProps = z.infer<typeof clientSchema>;
