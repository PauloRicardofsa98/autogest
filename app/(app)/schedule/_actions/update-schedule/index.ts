"use server";
import { Schedule, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const updateSchedule = async (
  uuid: string,
  scheduleParams: Prisma.ScheduleUpdateInput,
): Promise<Schedule | string> => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Usuário não autenticado");
  }

  try {
    const schedule = await db.schedule.update({
      where: { uuid },
      data: scheduleParams,
    });
    revalidatePath(`/schedule`);
    return schedule;
  } catch (error) {
    console.error(error);
    return "erro ao atualizar o agendamento";
  }
};
