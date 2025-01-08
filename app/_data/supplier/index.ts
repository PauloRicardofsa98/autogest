"use server";

import { db } from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";

export const listSuppliers = async (where?: Prisma.SupplierWhereInput) => {
  return await db.supplier.findMany({
    where,
    orderBy: {
      updatedAt: "desc",
    },
  });
};

export const getSupplier = async (where?: Prisma.SupplierWhereInput) => {
  return await db.supplier.findFirst({ where });
};
