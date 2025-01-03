"use client";

import { useState } from "react";
import usePromiseToast from "@/app/_hooks/toast-promise";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { CategoryProduct } from "@prisma/client";
import { deleteCategoryProduct } from "../_actions/delete-category-product";
import { AlertDelete } from "@/app/_components/alert-delete";
import Link from "next/link";

interface CategoryProductRowActionProps {
  categoryProduct: CategoryProduct;
}

export function CategoryProductRowActions({
  categoryProduct,
}: CategoryProductRowActionProps) {
  const toastPromise = usePromiseToast();
  const [openAlert, setOpenAlert] = useState(false);

  async function handleDelete() {
    const deleteCategoryProductPromise = deleteCategoryProduct(
      categoryProduct.uuid,
    );
    toastPromise.promise(deleteCategoryProductPromise, "delete");
    setOpenAlert(false);
  }

  const toggleAlert = () => setOpenAlert(!openAlert);

  return (
    <>
      <AlertDelete
        title="categoria"
        open={openAlert}
        toggleAlert={toggleAlert}
        handleDelete={handleDelete}
      />
      <div className="flex items-center space-x-2">
        <Link href={`/category-product/${categoryProduct.uuid}`}>
          <PencilIcon />
        </Link>

        <Trash2Icon className="cursor-pointer" onClick={toggleAlert} />
      </div>
    </>
  );
}
