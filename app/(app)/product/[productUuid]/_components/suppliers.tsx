import { DataTable } from "@/app/_components/table/dataTable";
import { db } from "@/app/_lib/prisma";
import { productSupplierColumns } from "./product-supplier-columns";

const ProductSuppliers = async () => {
  const suppliers = await db.productSupplier.findMany({
    include: {
      supplier: true,
      product: true,
    },
  });

  return (
    <DataTable
      columns={productSupplierColumns}
      data={JSON.parse(JSON.stringify(suppliers))}
    />
  );
};

export default ProductSuppliers;
