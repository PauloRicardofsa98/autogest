import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { FormProductSupplier } from "./product-supplier-form";
import { Product } from "@prisma/client";
import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";

interface ManagerProductSupplierProps {
  product: Product;
}
const ManagerProductSupplier = async ({
  product,
}: ManagerProductSupplierProps) => {
  const suppliers = await db.supplier.findMany();

  return (
    <Sheet>
      <SheetTrigger>
        <Button>Adicionar</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Adicione um fornecedor</SheetTitle>
        </SheetHeader>
        <FormProductSupplier
          product={product}
          productSupplier={null}
          suppliers={suppliers}
        />
      </SheetContent>
    </Sheet>
  );
};

export default ManagerProductSupplier;
