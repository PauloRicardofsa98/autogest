"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const deleteEmployer = async (uuid: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Usuário não autenticado");
  }

  try {
    const employer = await db.employer.delete({ where: { uuid } });
    revalidatePath("/employer");
    return employer;
  } catch (error) {
    console.error(error);
    return "erro ao excluir o serviço";
  }
};
