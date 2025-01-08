import { Brand } from "@prisma/client";
import { z } from "zod";

export const vehicleSchema = z.object({
  plate: z
    .string({
      required_error: "A placa é obrigatória",
    })
    .min(1, "Este campo é obrigatório"),
  model: z
    .string({
      required_error: "O modelo é obrigatório",
    })
    .min(1, "Este campo é obrigatório"),
  brand: z.nativeEnum(Brand, {
    required_error: "A marca é obrigatória",
  }),
  year: z
    .string({
      required_error: "O ano é obrigatório",
    })
    .optional(),
  color: z
    .string({
      required_error: "A cor é obrigatória",
    })
    .optional(),
  clientUuid: z.string().optional(),
});

export type VehicleProps = z.infer<typeof vehicleSchema>;
