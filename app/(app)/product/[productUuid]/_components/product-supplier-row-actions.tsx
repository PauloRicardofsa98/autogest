"use client";

import { useState } from "react";
import usePromiseToast from "@/app/_hooks/toast-promise";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { Prisma } from "@prisma/client";
import { AlertDelete } from "@/app/_components/alert-delete";
import { deleteProductSupplier } from "../_actions/delete-product-supplier";
import ManagerProductSupplier from "./manager-product-supplier";

type ProductSupplierAll = Prisma.ProductSupplierGetPayload<{
  include: { supplier: true; product: true };
}>;
interface ProductSupplierRowActionProps {
  productSupplier: ProductSupplierAll;
}

export function ProductSupplierRowActions({
  productSupplier,
}: ProductSupplierRowActionProps) {
  const toastPromise = usePromiseToast();
  const [openAlert, setOpenAlert] = useState(false);

  async function handleDelete() {
    const deleteProductPromise = deleteProductSupplier(productSupplier.uuid);
    toastPromise.promise(deleteProductPromise, "delete");
    setOpenAlert(false);
  }

  const toggleAlert = () => setOpenAlert(!openAlert);

  return (
    <>
      <AlertDelete
        title="Fornecedor do produto"
        open={openAlert}
        toggleAlert={toggleAlert}
        handleDelete={handleDelete}
      />
      <div className="flex items-center space-x-2">
        <ManagerProductSupplier
          product={productSupplier.product}
          productSupplier={productSupplier}
        >
          <PencilIcon className="cursor-pointer" />
        </ManagerProductSupplier>

        <Trash2Icon className="cursor-pointer" onClick={toggleAlert} />
      </div>
    </>
  );
}
