"use server";
import { Service, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const createService = async (
  customerParams: Prisma.ServiceCreateInput,
): Promise<Service | string> => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Usuário não autenticado");
  }

  try {
    const service = await db.service.create({ data: customerParams });
    revalidatePath("/service");
    return service;
  } catch (error) {
    console.error(error);
    return "erro ao criar o serviço";
  }
};
