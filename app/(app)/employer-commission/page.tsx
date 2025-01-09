import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { ChartRanking } from "./_components/chart-ranking";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { getEmployerCommission } from "@/app/_data/employer";
import { currencyFormat, getPeriod } from "@/app/_utils/helper";
import { DataTableFilterPeriod } from "@/app/_components/table/data-table-filter-period";

const EmployerCommission = async ({
  searchParams,
}: {
  searchParams: Promise<{ period: string }>;
}) => {
  const { period } = await searchParams;

  const filterPeriod = getPeriod(period);
  const now = new Date();
  const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const commission = await getEmployerCommission({
    createdAt: filterPeriod
      ? filterPeriod.createdAt
      : {
          gte: startOfCurrentMonth,
        },
  });

  return (
    <Card className="max-w-sm lg:max-w-full">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <span>Relatório de comissão</span>
            <DataTableFilterPeriod page="employer-commission" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartRanking commissions={commission} />
        <Card className="mt-4 !h-auto">
          <CardHeader>
            <CardTitle>Vendas por vendedor</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Rank</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Quantidade de vendas</TableHead>
                  <TableHead className="text-right">Valor em vendas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commission
                  .sort((a, b) => b.quantityServices - a.quantityServices)
                  .map((resume, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{resume.name}</TableCell>
                      <TableCell>{resume.quantityServices}</TableCell>
                      <TableCell className="text-right">
                        {currencyFormat(resume.value)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default EmployerCommission;
