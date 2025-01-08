"use server";
import { ProductSupplier, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const updateProductSupplier = async (
  uuid: string,
  productSupplierParams: Prisma.ProductSupplierUpdateInput,
): Promise<ProductSupplier | string> => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Usuário não autenticado");
  }

  try {
    const productSupplier = await db.productSupplier.update({
      where: { uuid },
      data: productSupplierParams,
    });
    revalidatePath(`/product/${uuid}`);
    return productSupplier;
  } catch (error) {
    console.error(error);
    return "erro ao atualizar o fornecedor produto";
  }
};
