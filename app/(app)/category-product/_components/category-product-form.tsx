"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/app/_components/ui/button";
import { Form } from "@/app/_components/ui/form";
import { Plus, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import usePromiseToast from "@/app/_hooks/toast-promise";
import { CategoryProduct } from "@prisma/client";
import {
  CategoryProductProps,
  categoryProductSchema,
} from "../_actions/category-product-schema";
import { InputField } from "@/app/_components/inputs/input-field";
import { updateCategoryProduct } from "../_actions/update-category-product";
import { createCategoryProduct } from "../_actions/create-category-product";

interface FormProps {
  categoryProduct: CategoryProduct | null;
}

export const FormCategoryProduct = ({ categoryProduct }: FormProps) => {
  const router = useRouter();
  const toastPromise = usePromiseToast();

  const form = useForm<CategoryProductProps>({
    resolver: zodResolver(categoryProductSchema),
    defaultValues: {
      name: categoryProduct?.name || "",
    },
  });

  async function onSubmit(data: CategoryProductProps) {
    if (categoryProduct) {
      const { uuid } = categoryProduct;
      const update = updateCategoryProduct(uuid, data).then((response) => {
        if (typeof response !== "string") {
          router.push("/category-product");
          form.reset();
        }
        return response;
      });
      toastPromise.promise(update, "update");
    } else {
      const create = createCategoryProduct(data).then((response) => {
        if (typeof response !== "string") {
          router.push("/category-product");
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
        <div className="grid grid-cols-1 gap-4">
          <InputField control={form.control} description="Nome" name="name" />
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
            {categoryProduct ? (
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
