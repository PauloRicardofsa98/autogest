"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/app/_components/ui/button";
import { Form } from "@/app/_components/ui/form";
import { Plus, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import usePromiseToast from "@/app/_hooks/toast-promise";
import { Prisma, Product, ProductSupplier, Supplier } from "@prisma/client";
import {
  ProductSupplierProps,
  productSupplierSchema,
} from "../_actions/product-supplier-schema";
import { updateProductSupplier } from "../_actions/update-product-supplier";
import { createProductSupplier } from "../_actions/create-product-supplier";
import { InputPrice } from "@/app/_components/inputs/price";
import { ComboboxInput } from "@/app/_components/inputs/combobox-input";

interface FormProps {
  productSupplier: ProductSupplier | null;
  product: Product;
  suppliers: Supplier[];
}

export const FormProductSupplier = ({
  productSupplier,
  product,
  suppliers,
}: FormProps) => {
  const router = useRouter();
  const toastPromise = usePromiseToast();

  const form = useForm<ProductSupplierProps>({
    resolver: zodResolver(productSupplierSchema),
    defaultValues: {
      supplierUuid: productSupplier?.supplierUuid || "",
      costPrice: productSupplier?.costPrice.toString() || "0",
    },
  });

  async function onSubmit(data: ProductSupplierProps) {
    const dataFormatted: Prisma.ProductSupplierCreateInput = {
      costPrice: Number(data.costPrice.replace("R$", "").replace(",", ".")),
      product: {
        connect: {
          uuid: product.uuid,
        },
      },
      supplier: {
        connect: {
          uuid: data.supplierUuid,
        },
      },
    };

    if (productSupplier) {
      const { uuid } = productSupplier;
      const update = updateProductSupplier(uuid, dataFormatted).then(
        (response) => {
          if (typeof response !== "string") {
            form.reset();
          }
          return response;
        },
      );
      toastPromise.promise(update, "update");
    } else {
      const create = createProductSupplier(dataFormatted, product.uuid).then(
        (response) => {
          if (typeof response !== "string") {
            form.reset();
          }
          return response;
        },
      );
      toastPromise.promise(create, "create");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <ComboboxInput
            control={form.control}
            form={form}
            description="Fornecedor"
            name="supplierUuid"
            options={suppliers.map((supplier) => ({
              uuid: supplier.uuid,
              name: supplier.name,
            }))}
          />

          <InputPrice
            control={form.control}
            description="Preço de compra"
            name="costPrice"
          />
        </div>

        <div className="flex w-full items-center justify-end gap-2">
          <Button
            type="button"
            variant="destructive"
            onClick={() => router.back()}
          >
            Cancelar
          </Button>
          <Button type="submit" className="flex gap-2">
            {productSupplier ? (
              <>
                <Upload />
                Atualizar
              </>
            ) : (
              <>
                <Plus />
                Adicionar
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
