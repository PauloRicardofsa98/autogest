import { z } from "zod";

export const employerSchema = z.object({
  name: z
    .string({
      required_error: "O nome é obrigatório",
    })
    .min(1, "Este campo é obrigatório"),

  email: z
    .string({
      required_error: "O email é obrigatório",
    })
    .email("Email inválido"),
  phone: z.string({
    required_error: "O telefone é obrigatório",
  }),
  cpf: z.string({
    required_error: "O CPF é obrigatório",
  }),
  address: z.string({
    required_error: "O endereço é obrigatório",
  }),
});

export type EmployerProps = z.infer<typeof employerSchema>;
