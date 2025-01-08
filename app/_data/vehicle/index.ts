"use server";

import { db } from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";

export const listVehicles = async ({
  where,
  include,
}: {
  where?: Prisma.VehicleWhereInput;
  include?: Prisma.VehicleInclude;
}) => {
  const vehicles = await db.vehicle.findMany({
    where,
    include,
    orderBy: {
      updatedAt: "desc",
    },
  });
  return JSON.parse(JSON.stringify(vehicles));
};

export const getVehicle = async (where?: Prisma.VehicleWhereInput) => {
  const vehicle = await db.vehicle.findFirst({ where });
  return JSON.parse(JSON.stringify(vehicle));
};
