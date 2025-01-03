"use server";

import { db } from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";

export const listCategoryProducts = async (
  where?: Prisma.CategoryProductWhereInput,
) => {
  return await db.categoryProduct.findMany({
    where,
    orderBy: {
      updatedAt: "desc",
    },
  });
};

export const getCategoryProduct = async (
  where?: Prisma.CategoryProductWhereInput,
) => {
  return await db.categoryProduct.findFirst({ where });
};
