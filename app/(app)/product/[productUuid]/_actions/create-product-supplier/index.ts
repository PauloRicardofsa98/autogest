"use server";
import { ProductSupplier, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const createProductSupplier = async (
  productSupplierParams: Prisma.ProductSupplierCreateInput,
  productUuid: string,
): Promise<ProductSupplier | string> => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Usuário não autenticado");
  }

  try {
    const productSupplier = await db.productSupplier.create({
      data: productSupplierParams,
    });
    revalidatePath(`/product/${productUuid}`);
    return productSupplier;
  } catch (error) {
    console.error(error);
    return "erro ao criar o fornecedor produto";
  }
};
