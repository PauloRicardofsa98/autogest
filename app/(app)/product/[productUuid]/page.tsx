import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { FormProduct } from "../_components/product-form";
import { getProduct } from "@/app/_data/product";
import ProductSuppliers from "./_components/suppliers";
import ManagerProductSupplier from "./_components/manager-product-supplier";
import { notFound } from "next/navigation";

const ManagerProduct = async ({
  params,
}: {
  params: Promise<{ productUuid: string }>;
}) => {
  const { productUuid } = await params;
  const product = await getProduct({ uuid: productUuid });

  if (!product) {
    return notFound();
  }

  return (
    <>
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>{product ? "Editar" : "Cadastrar"} produto</CardTitle>
          <CardDescription>Administre os dados do produto</CardDescription>
          <CardContent>
            <FormProduct product={JSON.parse(JSON.stringify(product))} />
          </CardContent>
        </CardHeader>
      </Card>
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>
            Fornecedores <ManagerProductSupplier product={product} />
          </CardTitle>
          <CardContent>
            <ProductSuppliers />
          </CardContent>
        </CardHeader>
      </Card>
    </>
  );
};

export default ManagerProduct;
