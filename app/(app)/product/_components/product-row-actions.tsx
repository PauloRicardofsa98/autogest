"use client";

import { useState } from "react";
import usePromiseToast from "@/app/_hooks/toast-promise";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { Product } from "@prisma/client";
import { deleteProduct } from "../_actions/delete-product";
import { AlertDelete } from "@/app/_components/alert-delete";
import Link from "next/link";

interface ProductRowActionProps {
  product: Product;
}

export function ProductRowActions({ product }: ProductRowActionProps) {
  const toastPromise = usePromiseToast();
  const [openAlert, setOpenAlert] = useState(false);

  async function handleDelete() {
    const deleteProductPromise = deleteProduct(product.uuid);
    toastPromise.promise(deleteProductPromise, "delete");
    setOpenAlert(false);
  }

  const toggleAlert = () => setOpenAlert(!openAlert);

  return (
    <>
      <AlertDelete
        title="producte"
        open={openAlert}
        toggleAlert={toggleAlert}
        handleDelete={handleDelete}
      />
      <div className="flex items-center space-x-2">
        <Link href={`/product/${product.uuid}`}>
          <PencilIcon />
        </Link>

        <Trash2Icon className="cursor-pointer" onClick={toggleAlert} />
      </div>
    </>
  );
}
