import { DataTable } from "@/app/_components/table/dataTable";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { listEmployers } from "@/app/_data/employer";
import { getPeriod } from "@/app/_utils/helper";
import { employerColumns } from "./_components/employer-columns";
import Link from "next/link";

const EmployerPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ period: string; employerUuid: string }>;
}) => {
  const { employerUuid, period } = await searchParams;

  const filterPeriod = getPeriod(period);

  const employers = await listEmployers({
    AND: filterPeriod,
    uuid: employerUuid,
  });

  return (
    <Card>
      <CardHeader className="flex-row justify-between">
        <div>
          <CardTitle>Funcionários</CardTitle>
          <CardDescription>Gerenciamento dos funcionários</CardDescription>
        </div>
        <Button asChild>
          <Link href="/employer/new">Cadastrar</Link>
        </Button>
      </CardHeader>

      <CardContent>
        <DataTable
          columns={employerColumns}
          data={employers}
          filterInput={{ name: "name", title: "Nome" }}
        />
      </CardContent>
    </Card>
  );
};

export default EmployerPage;
