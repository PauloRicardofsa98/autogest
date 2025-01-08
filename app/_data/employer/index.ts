"use server";

import { db } from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";

export const listEmployers = async (where?: Prisma.EmployerWhereInput) => {
  const employers = await db.employer.findMany({
    where,
    orderBy: {
      updatedAt: "desc",
    },
  });
  return JSON.parse(JSON.stringify(employers));
};

export const getEmployer = async (where?: Prisma.EmployerWhereInput) => {
  const employer = await db.employer.findFirst({ where });
  return JSON.parse(JSON.stringify(employer));
};
