"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const deleteService = async (uuid: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Usuário não autenticado");
  }

  try {
    const service = await db.service.delete({ where: { uuid } });
    revalidatePath("/service");
    return service;
  } catch (error) {
    console.error(error);
    return "erro ao excluir o serviço";
  }
};
