import { DataTable } from "@/app/_components/table/dataTable";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { listClients } from "@/app/_data/client";
import { getPeriod } from "@/app/_utils/helper";
import { clientColumns } from "./_components/client-columns";
import Link from "next/link";

const ClientPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ period: string; clientUuid: string }>;
}) => {
  const { clientUuid, period } = await searchParams;

  const filterPeriod = getPeriod(period);

  const clients = await listClients({
    AND: filterPeriod,
    uuid: clientUuid,
  });

  return (
    <Card>
      <CardHeader className="flex-row justify-between">
        <div>
          <CardTitle>Clientes</CardTitle>
          <CardDescription>Gerenciamento dos clientes</CardDescription>
        </div>
        <Button asChild>
          <Link href="/client/new">Cadastrar</Link>
        </Button>
      </CardHeader>

      <CardContent>
        <DataTable
          columns={clientColumns}
          data={clients}
          filterInput={{ name: "name", title: "Nome ou cpf" }}
          pageFilterPeriod="client"
        />
      </CardContent>
    </Card>
  );
};

export default ClientPage;
