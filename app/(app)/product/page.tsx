import { DataTable } from "@/app/_components/table/dataTable";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { listProducts } from "@/app/_data/product";
import { getPeriod } from "@/app/_utils/helper";
import { productColumns } from "./_components/product-columns";
import Link from "next/link";

const ProductPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ period: string; productUuid: string }>;
}) => {
  const { productUuid, period } = await searchParams;

  const filterPeriod = getPeriod(period);

  const products = await listProducts({
    AND: filterPeriod,
    uuid: productUuid,
  });

  return (
    <Card className="max-w-sm lg:max-w-full">
      <CardHeader className="flex-row justify-between">
        <div>
          <CardTitle>Produtos</CardTitle>
          <CardDescription>Gerenciamento dos produtos</CardDescription>
        </div>
        <Button asChild>
          <Link href="/product/new">Cadastrar</Link>
        </Button>
      </CardHeader>

      <CardContent>
        <DataTable
          columns={productColumns}
          data={JSON.parse(JSON.stringify(products))}
          filterInput={{ name: "name", title: "Nome" }}
          pageFilterPeriod="product"
        />
      </CardContent>
    </Card>
  );
};

export default ProductPage;
