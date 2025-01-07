"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/app/_components/ui/button";
import { Form } from "@/app/_components/ui/form";
import { Plus, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import usePromiseToast from "@/app/_hooks/toast-promise";
import { createProduct } from "../_actions/create-product";
import { updateProduct } from "../_actions/update-product";
import { Product, Unit } from "@prisma/client";
import { ProductProps, productSchema } from "../_actions/product-schema";
import { InputField } from "@/app/_components/inputs/input-field";
import { InputPrice } from "@/app/_components/inputs/price";
import { ComboboxInput } from "@/app/_components/inputs/combobox-input";

interface FormProps {
  product: Product | null;
}

export const FormProduct = ({ product }: FormProps) => {
  const router = useRouter();
  const toastPromise = usePromiseToast();

  const form = useForm<ProductProps>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      maximumStock: product?.maximumStock || 0,
      minimumStock: product?.minimumStock || 0,
      stock: product?.stock || 0,
      unit: product?.unit || "UN",
      sku: product?.sku || "",
      price: product?.price.toString() || "0",
      barcode: product?.barcode || "",
    },
  });

  async function onSubmit(data: ProductProps) {
    const dataFormatted = {
      name: data.name,
      maximumStock: data.maximumStock,
      minimumStock: data.minimumStock,
      stock: data.stock,
      unit: data.unit,
      sku: data.sku,
      price: Number(data.price.replace("R$", "").replace(",", ".")),
      barcode: data.barcode,
    };

    if (product) {
      const { uuid } = product;
      const update = updateProduct(uuid, dataFormatted).then((response) => {
        if (typeof response !== "string") {
          router.push("/product");
          form.reset();
        }
        return response;
      });
      toastPromise.promise(update, "update");
    } else {
      const create = createProduct(dataFormatted).then((response) => {
        if (typeof response !== "string") {
          router.push("/product");
          form.reset();
        }
        return response;
      });
      toastPromise.promise(create, "create");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-4 gap-4">
          <InputField control={form.control} description="Nome" name="name" />
          <InputField control={form.control} name="sku" description="Sku" />
          <InputField
            control={form.control}
            name="barcode"
            description="Código de barras"
          />
          <InputPrice control={form.control} description="Preço" name="price" />
          <ComboboxInput
            control={form.control}
            form={form}
            description="Unidade"
            name="unit"
            options={Object.values(Unit).map((unit) => ({
              uuid: unit,
              name: unit,
            }))}
          />
          <InputField
            control={form.control}
            description="Estoque mínimo"
            name="minimumStock"
            type="number"
          />
          <InputField
            control={form.control}
            description="Estoque máximo"
            name="maximumStock"
            type="number"
          />
          <InputField
            control={form.control}
            description="Estoque"
            name="stock"
            type="number"
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
            {product ? (
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
