"use server";

import { db } from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";

export const listClients = async (where?: Prisma.ClientWhereInput) => {
  return await db.client.findMany({
    where,
    orderBy: {
      updatedAt: "desc",
    },
  });
};

export const getClient = async (where?: Prisma.ClientWhereInput) => {
  return await db.client.findFirst({ where });
};
