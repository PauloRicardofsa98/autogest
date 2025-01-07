"use server";

import { db } from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";

export const listProducts = async (where?: Prisma.ProductWhereInput) => {
  return await db.product.findMany({
    where,
    orderBy: {
      updatedAt: "desc",
    },
  });
};

export const getProduct = async (where?: Prisma.ProductWhereInput) => {
  return await db.product.findFirst({ where });
};
